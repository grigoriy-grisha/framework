import { $ } from "../Utils/dom";
import { StoreSubscriber } from "../redux/StoreSubscriber";
import { hashCode } from "../Utils/utils";

export class WrapperComponents {
  protected components: Array<any>;
  protected store: any;
  protected class: string;
  protected storeSubscriber: any;
  protected initComponents: Array<any>;
  protected className: null | string;
  constructor(protected options: any) {
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
      const $el = $.create("div", this.className);

      const component = new Component($el, componentOption);
      $el.html(component.toHTML());
      $root.append($el);

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
