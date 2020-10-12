import { Component } from "../core/Components/Component";

import { Symmary } from "./Symmary/Symmary";
import { $ } from "../core/Utils/dom";
import { Cards } from "./Cards/Cards";
import {
  PageComponent,
  PageComponentInstanceType,
} from "../core/Components/PageComponent";



export class Main extends Component<{}> {
  public static className = "main";
  symmary: PageComponentInstanceType;
  cards: PageComponentInstanceType;

  constructor(options: any) {
    super({
      listeners: [],
      subscribe: ["title"],
      ...options,
    });

    this.symmary = new PageComponent({
      components: [Symmary],
      class: "symmary",
      store: options.store,
    });

    this.cards = new PageComponent({
      components: [Cards],
      class: "cards",
      store: options.store,
    });
  }

  toHTML() {
    return `
    <main id="main">
        <div class="container display-flex">
          <div class="card-block">${$(
            this.cards.getRoot()
          ).toStringHtml()}</div>
          <div class="card-block">${$(
            this.symmary.getRoot()
          ).toStringHtml()}</div>
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
