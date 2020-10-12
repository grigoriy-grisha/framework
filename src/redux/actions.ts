import { InferActionsTypes } from "./initialState";

export const actions = {
  getItemsProduct: (data: any) =>
    ({ type: "PRODUCT_GET_ITEMS", payload: data } as const),
  setItemProduct: (data: any) =>
    ({ type: "SET_ITEM_PRODUCT", payload: data } as const),
  setCurrentEating: (data: string) =>
    ({ type: "SET_CURRENT_EATING", payload: data } as const),
  setCurrentId: (data: string) =>
    ({ type: "SET_CURRENT_ID", payload: data } as const),
  setEating: (data: SetEatingType) =>
    ({ type: "SET_EATING", payload: data } as const),
  setNutrients: (data: any) =>
    ({ type: "SET_NUTRIENTS", payload: data } as const),
  deleteProduct: (data: any) =>
    ({ type: "DELETE_PRODUCT", payload: data } as const),
};

export type ActionType = InferActionsTypes<typeof actions>;

export type SetEatingType = {
  eating: string;
  products: {
    id: string;
    name: string;
    nutrients: Array<IProductItemNutrients>;
    value: number;
  };
};
