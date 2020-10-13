import { InferActionsTypes } from "./initialState";
import { DeleteProductType, SetEatingType, SetNutrientsType } from "./types";

export const actions = {
  getItemsProduct: (data: Array<IPrductItem> | []) => ({ type: "PRODUCT_GET_ITEMS", payload: data } as const),

  setItemProduct: (data: string) => ({ type: "SET_ITEM_PRODUCT", payload: data } as const),

  setCurrentEating: (data: string) => ({ type: "SET_CURRENT_EATING", payload: data } as const),

  setCurrentId: (data: string) => ({ type: "SET_CURRENT_ID", payload: data } as const),

  setEating: (data: SetEatingType) => ({ type: "SET_EATING", payload: data } as const),
    
  setNutrients: (data: SetNutrientsType) => ({ type: "SET_NUTRIENTS", payload: data } as const),

  deleteProduct: (data: DeleteProductType) => ({ type: "DELETE_PRODUCT", payload: data } as const),

};

export type ActionType = InferActionsTypes<typeof actions>;
