import { find, fixed, getString, incdec } from "../core/Utils/utils";
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

  switch (action.type) {
    case "PRODUCT_GET_ITEMS": {
      return { ...state, productItems: action.payload };
    }
    case "SET_ITEM_PRODUCT": {

      const foodNutrients = find(
        getState(state, ["productItems"]),
        "fdcId",
        Number(action.payload)
      );

      return { ...state, currentProduct: foodNutrients };
    }
    case "SET_CURRENT_EATING": {
      return { ...state, currentEating: action.payload };
    }
    case "SET_CURRENT_ID": {
      return { ...state, currentId: action.payload };
    }
    case "DELETE_PRODUCT": {
      let symmary = getState(state, [action.payload.currentEating]).symmary;

      const products = getState(state, [action.payload.currentEating]).products.filter(
        (item: any) => {
          if (item.id === action.payload.id) {
            amount = item.value;
            element = item;
            symmary = incdec(symmary, item.value, "-");
          }
          return item.id !== action.payload.id;
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
        [action.payload.currentEating]: {
          ...getState(state, [action.payload.currentEating]),
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
        [action.payload.eating]: {
          products: [
            ...getState(state, [action.payload.eating]).products,
            action.payload.products,
          ],
          symmary: fixed(
            getState(state, [action.payload.eating]).symmary + action.payload.products.value,
            0
          ),
        },
      };
    }
    case "SET_NUTRIENTS": {
      getState(state, "total").totalNutrients.map((item: any) => {
        const amount = find(action.payload.totalNutrients, "name", item.name);
        if (amount) {
          item.amount = incdec(item.amount, amount.amount, "+");
        }
        return item;
      });

      action.payload.totalNutrients.forEach((elem: any) => {
        if (numberMacronutrients.includes(elem.number)) {
          value = incdec(value, elem.amount, "+");
        }
      });

      return {
        ...state,
        total: {
          left: fixed(getState(state, "total").left - action.payload.consumed),
          consumed: fixed(getState(state, "total").consumed + action.payload.consumed),
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


