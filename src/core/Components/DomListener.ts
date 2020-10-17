import { DomInstanseType } from './../Utils/dom';
import { $ } from "../Utils/dom";
import { classes } from "../Utils/utils";

export class DomListener {
  protected $main!: DomInstanseType;
  constructor(protected listeners: Array<string>, protected className: string) {
 
    if (!className) {
      throw new Error(`No className provided for DomListener!`);
    }

    if (!listeners || !Array.isArray(listeners)) {
      throw new Error(`Need provide listenrs for DomListener or listeners must have instance of Array!`);
    }

    this.listeners = listeners;
    this.className = className;
    
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
      this.$main = $(document.body).find(classes(this.className))!;
      this.$main.on(listener, (this as any)[method]);
    });
  }

  removeDomListeners() {
    this.listeners.forEach((listener: string) => {
      const method = capitalize(listener);
      (this as any)[method] = (this as any)[method].bind(this);
      this.$main.off(listener, (this as any)[method]);
    });
  }
}

function capitalize(listener: string) {
  return "on" + listener[0].toUpperCase() + listener.slice(1);
}
