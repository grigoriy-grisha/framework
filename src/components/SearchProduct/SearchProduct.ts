import { actions } from "./../../redux/actions";
import { ActiveRouter } from "./../../core/Router/ActiveRouter";
import { Component } from "../../core/Components/Component";
import { http } from "../../core/Utils/Http";
import { renderProductItems } from "./searchProduct.functions";
import { $ } from "../../core/Utils/dom";
import { isAttr, maxPage } from "../../core/Utils/utils";
import { pathSearch, preloader } from "../../constants";

type StateType = { page: number; productItems: Array<IPrductItem> | [];  loader: boolean };

export class SearchProduct extends Component<StateType> {
  public static  className = "search-roduct";

  protected range: number;
  protected productItems: Array<IPrductItem>;
  protected maxPage: number;
  constructor(protected options: any) {
    super({
      listeners: ["click", "keydown"],
      subscribe: [],
      ...options,
    });

    if (!this.$getState().currentEating) {
      ActiveRouter.navigate("");
    }
    this.productItems = this.$getState().productItems;

    this.initState({ page: 1, productItems: [], loader: true });
    this.maxPage = 0;
    this.range = 10;
  }

  toHTML() {
    this.maxPage = maxPage(this.productItems.length, this.range);
    this.productItems = this.$getState().productItems;


    return `
    <div class="search-product">
      <div>
        <div class="display-flex align-center input-wrapper">        
            <input type="text"  class="search-product__input" data-type="product__input" placeholder="Ведите название продукта">
            <i class="material-icons green-color cursor-pointer background-hover" data-type="send">arrow_forward</i>
        </div>
      </div>
      
      ${
        this.state.loader
          ? renderProductItems(this.productItems, this.state.page, this.range)
          : preloader
      }          
      <div class="search-product__flipping">
        <button class="prev" ${
          this.state.page === 1 ? "disabled" : ""
        } data-type="prev"><i class="material-icons green-color cursor-pointer background-hover" data-type="prev">arrow_back</i></button>
        <button class="next" ${
          this.state.page >= this.maxPage ? "disabled" : ""
        } data-type="next"><i class="material-icons green-color cursor-pointer background-hover"  data-type="next">arrow_forward</i></button>
      </div>
    </div>
       
  `;
  }
  onClick(e: any) {
    e.preventDefault();
    const $target = $(e.target);
    const attribute = $target.attr("data-type");
    let value: string | undefined;

    if (this.$main) {
      const $input = this.$main.find('[data-type="product__input"]');
      if ($input) {
        value = $input.value();
      }
    }

    if (isAttr(attribute, "send") && value) {
      this.getProducts(value);
    }

    if (isAttr(attribute, "product")) {
      this.clickProduct($target);
    }
    if (isAttr(attribute, "prev")) {
      if (this.state.page !== 1) {
        this.setState({ page: this.state.page - 1 });
      }
    }
    if (isAttr(attribute, "next")) {
      if (this.state.page < this.maxPage) {
        this.setState({ page: this.state.page + 1 });
      }
    }
  }

  clickProduct($target: any) {
    const href = $target.closest("a").attr("href");
    const id = $target.attr("data-id")
    this.$dispatch(actions.setItemProduct(id));
    ActiveRouter.navigate(href);
  }

  getProducts(value: string) {
    this.setState({ loader: false });
    http.get(pathSearch + value).then((response) => {
      this.$dispatch(actions.getItemsProduct(response));
      this.setState({ loader: true });
    });
  }

  onKeydown(e: any) {
    if (e.key === "Enter") {
      const $input = this.$main.find('[data-type="product__input"]');
      let value;
      if ($input) {
        value = $input.value();
      }
      if (value) {
        this.getProducts(value);
      }
    }
  }

  storeChanged(change: any) {}

  init() {
    super.init();
  }

  destroy() {
    super.destroy();
  }
}
