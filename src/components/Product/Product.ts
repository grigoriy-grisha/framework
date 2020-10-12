import { Component } from "../../core/Components/Component";
import { renderMacronutrients } from "./product.functions";
import { $ } from "../../core/Utils/dom";
import { hash, validationMass } from "../../core/Utils/utils";
import { numberNutrient } from "../../constants";
import { ActiveRouter } from "../../core/Router/ActiveRouter";
import { actions } from "../../redux/actions";
export class Product extends Component<{}> {
  public static  className = "roduct";
  nutrients: Array<IProductItemNutrients>;
  currentProduct: IPrductItem;
  currentEating: string;
  constructor(protected options: any) {
    super({
      listeners: ["input", "click"],
      subscribe: ["currentProduct"],
      ...options,
    });
    if (!this.$getState().currentEating) {
      ActiveRouter.navigate("");
    }
    this.currentProduct = this.$getState().currentProduct;
    this.currentEating = this.$getState().currentEating;

    this.nutrients = this.currentProduct.foodNutrients;
  }

  toHTML() {
    return `
    <div class="container">
        <div class="col s12 m7">
            <h2 class="header">${this.currentProduct.description}</h2>
            <div class="card horizontal">
                <div class="card-stacked">
                    <div class="card-content">
                        <p>Brand: ${this.currentProduct.brandOwner}</p>
                        <div class="card-wrapper">
                          <input class="card-input" type="text" placeholder="Введите массу продукта" value="100" data-input="input">
                          <span>GR</span>
                        </div> 
                        <i class="material-icons green-color cursor-pointer background-hover" data-type="send" >add_box</i>
                    </div>
                    <div class="card-action">
                        ${renderMacronutrients(this.nutrients)}
                    </div>
                </div>
            </div>
        </div>
    </div>
  `;
  }

  storeChanged(change: any) {}
  init() {
    super.init();
  }

  onClick(e: any) {
    const $target = $(e.target);
    const attribute = $target.attr("data-type");

    if (attribute) {
      let value;
      const input = this.$main.find('[data-input="input"]');
      const nutrients = this.nutrients.filter((item: any) => {
        return numberNutrient.includes(item.number);
      });
      const energy = nutrients.filter((item: any) => {
        return item.number === "208";
      })[0].amount;

      value = !!input!.value() ? (energy * +input!.value()) / 100 : energy;

      const id = hash();
      this.$dispatch(
        actions.setEating({
          eating: this.currentEating,
          products: {
            id,
            name: this.currentProduct.description,
            nutrients: nutrients,
            value: Math.floor(value),
          },
        })
      );
      this.$dispatch(
        actions.setNutrients({
          consumed: Math.floor(value),
          totalNutrients: nutrients,
        })
      );
      ActiveRouter.goBack();
    }
  }
  onInput(e: any) {
    const $target = $(e.target);
    const value = $target.value();
    let validation;

    if (value) {
      validation = validationMass(value);
    }

    if (validation) {
      $target.value(validation);
    }
  }

  destroy() {
    super.destroy();
  }
}
