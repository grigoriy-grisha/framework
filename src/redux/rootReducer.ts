import { find, fixed, getString, incdec } from "../core/Utils/utils";
import { numberMacronutrients } from "./../constants";
import { ActionType } from "./actions";
import {
  EatingType,
  initialStateType,
  TotalNutrientsType,
  TotalType,
} from "./initialState";
import {
  ProductType,
  SetNutrientsType,
} from "./types";

export function rootReducer(
  state: initialStateType,
  action: ActionType
): initialStateType {
  let value = 0;
  let amount = 0;
  let element: any = {};

  let currentEating: string;
  let id: string;
  let products: ProductType;
  let total: TotalType

  const payload = getPayload(action.payload);
  switch (action.type) {
    case "PRODUCT_GET_ITEMS": {
      return {
        ...state,
        productItems: getPayload<IPrductItem[] | []>(action.payload),
      };
    }
    case "SET_ITEM_PRODUCT": {
      const foodNutrients = find(
        getState(state, ["productItems"]),
        "fdcId",
        Number(payload)
      );

      return { ...state, currentProduct: foodNutrients };
    }
    case "SET_CURRENT_EATING": {
      return { ...state, currentEating: getPayload<string>(action.payload) };
    }
    case "SET_CURRENT_ID": {
      return { ...state, currentId: getPayload<string>(action.payload) };
    }
    case "DELETE_PRODUCT": {
      id = getPayload<string>(action.payload, "id");
      currentEating = getPayload<string>(action.payload, "currentEating");
      total = getState<TotalType>(state, "total")

      let symmary = getState<EatingType>(state, [currentEating]).symmary;

      const products = getState<EatingType>(state, [
        currentEating,
      ]).products.filter((item: IEating) => {
        if (item.id === id) {
          amount = item.value;
          element = item;
          symmary = incdec(symmary, item.value, "-");
        }
        return item.id !== id;
      });
      element.nutrients.forEach((elem: IProductItemNutrients) => {
        if (numberMacronutrients.includes(elem.number)) {
          incdec(value, elem.amount, "+");
          value = +(value + elem.amount).toFixed(2);
        }
      });
      getState<EatingType>(state, [currentEating])
      total.totalNutrients.map((nutrient: TotalNutrientsType) => {
        const amount = find(element.nutrients, "name", nutrient.name);
        if (amount) {
          nutrient.amount = incdec(nutrient.amount, amount.amount, "-");
        }

        return nutrient;
      });

      return {
        ...state,
        [currentEating]: {
          ...getState<EatingType>(state, [currentEating]),
          products: products,
          symmary: symmary,
        },
        total: {
          ...total,
          left: fixed(total.left + amount),
          consumed: fixed(
            total.consumed - amount
          ),
          totalNutrients: total.totalNutrients,
          totalNutrientsMass: fixed(state.total.totalNutrientsMass - value),
        },
      };
    }
    case "SET_EATING": {
      currentEating = getPayload<string>(action.payload, "eating");
      products = getPayload<ProductType>(action.payload, "products");
      return {
        ...state,
        [currentEating]: {
          products: [
            ...getState<EatingType>(state, [currentEating]).products,
            products,
          ],
          symmary: fixed(
            getState<EatingType>(state, [currentEating]).symmary +
              products.value,
            0
          ),
        },
      };
    }
    case "SET_NUTRIENTS": {
      total = getState<TotalType>(state, "total")

      total.totalNutrients.map(
        (item: TotalNutrientsType) => {
          const amount = find(
            getPayload<SetNutrientsType>(action.payload).totalNutrients,
            "name",
            item.name
          );
          if (amount) {
            item.amount = incdec(item.amount, amount.amount, "+");
          }
          return item;
        }
      );

      getPayload<SetNutrientsType>(action.payload).totalNutrients.forEach((elem: IProductItemNutrients) => {
        if (numberMacronutrients.includes(elem.number)) {
          value = incdec(value, elem.amount, "+");
        }
      });

      return {
        ...state,
        total: {
          left: fixed(
            total.left - action.payload.consumed
          ),
          consumed: fixed(
            total.consumed +
              action.payload.consumed
          ),
          totalNutrients: total.totalNutrients,
          totalNutrientsMass: fixed(
            total.totalNutrientsMass + value
          ),
        },
      };
    }
    default:
      return state;
  }
}

function getState<T>(state: any, field: any): T {
  return state[field];
}

function getPayload<T>(action: any, field?: any): T {
  if (field) {
    return action[field];
  }
  return action;
}
