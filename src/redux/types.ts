export const PRODUCT_GET_ITEMS = "PRODUCT_GET_ITEMS";
export const SET_ITEM_PRODUCT = "SET_ITEM_PRODUCT";
export const SET_CURRENT_EATING = "SET_CURRENT_EATING";
export const SET_EATING = "SET_EATING";
export const SET_NUTRIENTS = "SET_NUTRIENTS";
export const SET_CURRENT_ID = "SET_CURRENT_ID";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export type ProductType = {
  id: string;
  name: string;
  nutrients: Array<IProductItemNutrients>;
  value: number;
}

export type SetEatingType = {
    eating: string;
    products: ProductType
  };
  
  export type SetNutrientsType = {
    consumed: number
    totalNutrients: Array<IProductItemNutrients>
  }
  
  export type DeleteProductType = {
    currentEating: string,
    id: string,
  }