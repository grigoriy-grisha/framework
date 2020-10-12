interface IPrductItem {
  brandOwner: string;
  dataType: string;
  description: string;
  fdcId: number;
  foodNutrients: Array<IProductItemNutrients>;
}

interface IProductItemNutrients {
  amount: number;
  derivationCode: string;
  derivationDescription: string;
  name: string;
  number: string;
  unitName: string;
}

interface IEating {
  id: string;
  name: string;
  nutrients: Array<IProductItemNutrients>;
  value: number;
}


interface PageType  {
  components: Array<any>;
  class: string;
  store: StoreType;
};

interface OptionsType {
  store: StoreType;
  className: string
  listeners: Array<string> | []
  subscribe: Array<string> | [],

}

