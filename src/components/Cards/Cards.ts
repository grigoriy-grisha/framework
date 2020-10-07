import { cardName } from "../../constants";
import { Component } from "../../core/Components/Component";
import { TheDatepicker } from "../../lib/datepicker/the-datepicker";
import { cardRender } from "./cards.functions";
export class Cards extends Component {
  static className = "header";

  constructor(protected $root: any, options: any) {
    super($root, {
      listeners: [],
      subscribe: ["title"],
      ...options,
    });

    this.initState({ a: "a" });
  }

  toHTML() {
    const cards = cardName.map((name: string) => cardRender(name));
    return `
        ${cards.join("")}
    `;
  }

  storeChanged(change: any) {}
  init() {
    super.init();
  }


  destroy() {
    super.destroy();
  }
}
