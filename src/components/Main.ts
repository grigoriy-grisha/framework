import { cardName } from "../constants";
import { Component } from "../core/Components/Component";
import { initComponents } from "../core/Components/initComponents";
import { cardRender } from "./Cards/cards.functions";
import { Symmary } from "./Symmary/Symmary";
import { $ } from "../core/Utils/dom";
import { Cards } from "./Cards/Cards";
export class Main extends Component {
  static className = "main";
  symmary: any;
  cards: any;
  constructor(protected $root: any, options: any) {
    super($root, {
      listeners: [],
      subscribe: ["title"],
      ...options,
    });

    this.symmary = initComponents(Symmary, options.store, "symmary");
    this.cards = initComponents(Cards, options.store, "cards");
  }

  toHTML() {
    return `
    <main id="main">
        <div class="container display-flex">
          <div class="card-block">${$(this.cards.html).toStringHtml()}</div>
          <div class="card-block">${$(this.symmary.html).toStringHtml()}</div>
        </div>
    </main> `;
  }

  storeChanged(change: any) {}

  init() {
    super.init();
    this.symmary.init();
    this.cards.init();
  }

  destroy() {
    super.destroy();
    this.symmary.destroy();
    this.cards.destroy();
  }
}
