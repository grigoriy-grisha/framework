import { Header } from "./../../components/Header/Header";

import { Component as ComponentParent } from "./Component";

import { $ } from "../Utils/dom";
import { StoreSubscriber, StoreSubscriberType } from "../redux/StoreSubscriber";
import { hashCode } from "../Utils/utils";
import { StoreType } from "../redux/createStore";

export type PageComponentInstanceType = PageComponent;

export class PageComponent {
  protected components: Array<any>;
  protected store: StoreType;
  protected class: string;
  protected storeSubscriber: StoreSubscriberType;
  protected initComponents: Array<any>;
  protected className: null | string;
  constructor(protected options: PageType) {
    this.components = options.components;
    this.initComponents = [];
    this.store = options.store;
    this.class = options.class;
    this.storeSubscriber = new StoreSubscriber(this.store);
    this.init = this.init.bind(this);
    this.destroy = this.destroy.bind(this);
    this.className = null;
  }

  getRoot() {
    const $root = $.create("div", this.class);

    this.initComponents = this.components.map((Component) => {
      this.className = hashCode(Component.className);

      const componentOption = {
        store: this.store,
        className: this.className,
      };

      const $elem = $.create("div", this.className);

      const component = new Component(componentOption);

      if (!(component instanceof ComponentParent)) {
        throw new Error("Component must been instance ComponentParent!");
      }
      $elem.html(component.toHTML());
      $root.append($elem);

      return component;
    });

    return $root.$el;
  }

  init() {
    this.storeSubscriber.subscribeComponents(this.initComponents);
    this.initComponents.forEach((component) => component.init());
  }

  destroy() {
    this.initComponents.forEach((component) => component.destroy());
    this.storeSubscriber.unsubscribeComponents();
  }
}

type OptionType = {
  store: StoreType;
  className: string;
};
