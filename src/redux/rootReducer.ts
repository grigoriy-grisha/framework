import { PRODUCT_GET_ITEMS } from './types';
export function rootReducer(state: any, action: any) {
  console.log(action);
  switch (action.type) {
 
    
    case PRODUCT_GET_ITEMS: {
      return {...state, productItems: action.payload}
    }
    default:
      return state;
  }
}
