import { initialStateType } from './../../redux/initialState';
import { actions } from './../../redux/actions';
import { cardName } from "../../constants";
import { Component } from "../../core/Components/Component";
import { $ } from "../../core/Utils/dom";
import { cardRender } from "./cards.functions";
import { ActiveRouter } from "../../core/Router/ActiveRouter";
import { isAttr } from "../../core/Utils/utils";
export class Cards extends Component<{}> {
  public static  className = "cards";
  eating: initialStateType
  constructor(protected options: any) {
    super({ 
      listeners: ["click"],
      subscribe: ["Breakfast", "Dinner", "Supper", "Snack"],
      ...options,
    });

   
    this.eating = this.$getState()
  }

  toHTML() {
    this.eating = this.$getState()
    
    return cardName
          .map((name: string) => cardRender(name, this.eating))
          .join("");
   
  }
  

  onClick(e: any) {
    const $target = $(e.target);
    const attribute = $target.attr("data-type");

    if (attribute) {
      if (cardName.includes(attribute)) {
        this.$dispatch(actions.setCurrentEating(attribute));
        ActiveRouter.navigate("#search");
      }
      if (isAttr(attribute, "delete")) {
        const eating = $target.attr("data-eating");
        const id = $target.attr("data-id");
        this.$dispatch(
          actions.deleteProduct({
            currentEating: eating,
            id: id,
          })
        );
      }
    }
  }

  // storeChanged(change: any) {
  //   this.setState(change);
  // }

  init() {
    super.init();
  }

  destroy() {
    super.destroy();
  }
}
