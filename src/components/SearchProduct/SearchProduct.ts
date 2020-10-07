import { Component } from "../../core/Components/Component";
import { http } from "../../core/Utils/Http";
import { renderProductItems } from "./searchProduct.functions";
import { $ } from '../../core/Utils/dom'
import { isAttr } from "../../core/Utils/utils";
import { pathSearch } from "../../constants";
import { getItemsProduct } from "../../redux/actions";
export class SearchProduct extends Component {
  static className = "search-roduct";

  constructor(protected $root: any, options: any) {
    super($root, {
      listeners: ["input", 'click'],
      subscribe: ["title"],
      ...options,
    });

    this.initState({ a: "a" });
  }

  toHTML() {
    return `
    <div class="search-product">
      <div>
        <div class="display-flex align-center">        
            <input type="text"  class="search-product__input" placeholder="Ведите название продукта">
            <i class="material-icons green-color cursor-pointer" data-type="send">arrow_forward</i>
        </div>
      </div>
      ${renderProductItems(this.$getState().productItems)}            
    </div>
       
  `;
  }
  onClick(e: any) {
    const $target = $(e.target)
    // this.$dispatch({ payload: "asdasd", type: "a" });
    console.log(this.getProducts($target));
    
    // this.setState({ a: "b" });
  }

  getProducts($target :any) {
    const attribute = $target.data('data-type')

    
    if (isAttr(attribute, 'send')) {
      http.get(pathSearch + 'bread').then(response => {
        this.$dispatch(getItemsProduct(response))
      })
    }
  }

  storeChanged(change: any) {}
  init() {
    super.init();
  }
  onInput(e: any) {
    this.$dispatch({ payload: e.target.value, type: "a" });
  }

  destroy() {
    super.destroy();
  }
}
