export const initialState = {
  productItems: [] as Array<IPrductItem> | [],
  currentProduct: {} as IPrductItem ,
  currentEating: "" as string,
  currentId: "" as string,
  Breakfast: {
    symmary: 0 as number,
    products: [] as Array<IEating> | [],
  },
  Dinner: {
    symmary: 0 as number,
    products: [] as Array<IEating> | [],
  },
  Supper: {
    symmary: 0 as number,
    products: [] as Array<IEating> | [],
  },
  Snack: {
    symmary: 0 as number,
    products: [] as Array<IEating> | [],
  },
  total: {
    left: 2600 as number,
    consumed: 0 as number,
    totalNutrientsMass: 0 as number,
    totalNutrients: [
      { name: "Protein", amount: 0, unitName: "G" },
      { name: "Total lipid (fat)", amount: 0, unitName: "G" },
      { name: "Carbohydrate, by difference", amount: 0, unitName: "G" },
      { name: "Iron, Fe", amount: 0, unitName: "MG" },
      { name: "Cholesterol", amount: 0, unitName: "MG" },
    ],
  },
};

export type initialStateType = typeof initialState

export type TotalType = typeof initialState.total

export type EatingType = typeof initialState.Breakfast

export type TotalNutrientsType = typeof initialState.total.totalNutrients[0]

type ProperiesType<T> = T extends {[key: string]: infer U} ? U : never

export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<ProperiesType<T>>


