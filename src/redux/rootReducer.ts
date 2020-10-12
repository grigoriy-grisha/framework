import { find, fixed, incdec } from "../core/Utils/utils";
import { numberMacronutrients } from "./../constants";
import { ActionType } from "./actions";
import { initialStateType } from "./initialState";

export function rootReducer(
  state: initialStateType,
  action: ActionType
): initialStateType {
  let value = 0;
  let amount = 0;
  let element: any = {};
  const payload = action.payload;
  switch (action.type) {
    case "PRODUCT_GET_ITEMS": {
      return { ...state, productItems: payload };
    }
    case "SET_ITEM_PRODUCT": {
      return { ...state, currentProduct: payload };
    }
    case "SET_CURRENT_EATING": {
      return { ...state, currentEating: payload };
    }
    case "SET_CURRENT_ID": {
      return { ...state, currentId: payload };
    }
    case "DELETE_PRODUCT": {
      let symmary = getState(state, [payload.currentEating]).symmary;

      const products = getState(state, [payload.currentEating]).products.filter(
        (item: any) => {
          if (item.id === payload.id) {
            amount = item.value;
            element = item;
            symmary = incdec(symmary, item.value, "-");
          }
          return item.id !== payload.id;
        }
      );
      element.nutrients.forEach((elem: any) => {
        if (numberMacronutrients.includes(elem.number)) {
          incdec(value, elem.amount, "+");
          value = +(value + elem.amount).toFixed(2);
        }
      });
      state.total.totalNutrients.map((nutrient: any) => {
        const amount = find(element.nutrients, "name", nutrient.name);
        if (amount) {
          nutrient.amount = incdec(nutrient.amount, amount.amount, "-");
        }

        return nutrient;
      });

      return {
        ...state,
        [payload.currentEating]: {
          ...getState(state, [payload.currentEating]),
          products: products,
          symmary: symmary,
        },
        total: {
          ...getState(state, "total"),
          left: fixed(getState(state, "total").left + amount),
          consumed: fixed(getState(state, "total").consumed - amount),
          totalNutrients: getState(state, "total").totalNutrients,
          totalNutrientsMass: fixed(state.total.totalNutrientsMass - value),
        },
      };
    }
    case "SET_EATING": {
      return {
        ...state,
        [payload.eating]: {
          products: [
            ...getState(state, [payload.eating]).products,
            payload.products,
          ],
          symmary: fixed(
            getState(state, [payload.eating]).symmary + payload.products.value,
            0
          ),
        },
      };
    }
    case "SET_NUTRIENTS": {
      getState(state, "total").totalNutrients.map((item: any) => {
        const amount = find(payload.totalNutrients, "name", item.name);
        if (amount) {
          item.amount = incdec(item.amount, amount.amount, "+");
        }
        return item;
      });

      payload.totalNutrients.forEach((elem: any) => {
        if (numberMacronutrients.includes(elem.number)) {
          value = incdec(value, elem.amount, "+");
        }
      });

      return {
        ...state,
        total: {
          left: fixed(getState(state, "total").left - payload.consumed),
          consumed: fixed(getState(state, "total").consumed + payload.consumed),
          totalNutrients: getState(state, "total").totalNutrients,
          totalNutrientsMass: fixed(
            getState(state, "total").totalNutrientsMass + value
          ),
        },
      };
    }
    default:
      return state;
  }
}

function getState(state: any, field: any) {
  return state[field];
}
