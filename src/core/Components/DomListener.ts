import { $ } from "../Utils/dom";

export class DomListener {
  constructor(protected $root: any, protected listeners: Array<string>,protected className: string) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener!`);
    }
    this.listeners = listeners;
    this.className = className;
    this.$root = $root;
  }

  initDomListeners() {
    this.listeners.forEach((listener: string) => {
      const method = capitalize(listener);
      if (!(this as any)[method]) {
        throw new Error(
          `${listener} a was specified but function ${method} not announced`
        );
      }
      (this as any)[method] = (this as any)[method].bind(this);
      
      $(document.body).find(classes(this.className))?.on(listener, (this as any)[method]);
      
      // this.$root.on(listener, (this as any)[method]);
    });
  }

  removeDomListeners() {
    this.listeners.forEach((listener: string) => {
      const method = capitalize(listener);
      (this as any)[method] = (this as any)[method].bind(this);
      this.$root.off(listener, (this as any)[method]);
    });
  }
}

function capitalize(listener: string) {
  return "on" + listener[0].toUpperCase() + listener.slice(1);
}

function classes(className: string) {
  return '.' + className
}

