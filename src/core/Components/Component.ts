import { DomInstanseType } from "./../Utils/dom";
import { DomListener } from "./DomListener";
import { classes, isEqual } from "../Utils/utils";
import { $ } from "../Utils/dom";
import { initialStateType } from "../../redux/initialState";
import { StoreType } from "../redux/createStore";



export class Component<S> extends DomListener  {
  store: StoreType;
  state!: S;
  subscribe: Array<string>;
  $main!: DomInstanseType;
  constructor(protected options: OptionsType) {
    super(options.listeners, options.className);

    this.store = options.store;
    this.subscribe = options.subscribe;
    this.prepare();
  }

  prepare() {}

  initState(initialState: S) {
    this.state = { ...initialState };
  }
  $getState(): initialStateType {
    return this.store.getState();
  }

  setState<T>(newState: T) {
    const nextState = { ...this.state, ...newState };
    
    if (!isEqual(this.state, nextState)) {
      this.state = nextState
      this.$main!.html(this.toHTML());
    }
  }
  $dispatch<T>(action: T) {
    const prevState = this.store.getState();

    this.store.dispatch<T>(action);
    if (!isEqual(prevState, this.store.getState())) { 
      this.$main!.html(this.toHTML());
    }
  }
  toHTML() {
    return ``;
  }

  storeChanged<T>(change: T) {}

  isWatching(key: any) {
    return this.subscribe.includes(key);
  }

  init() {
  
    this.$main = $(document.body).find(classes(this.options.className))!;

    if (!this.$main) {
      throw new Error(`${classes(this.options.className)} don't defined! Append this Element in DOM`)
    }
    
    this.initDomListeners();
  }

  destroy() {
    this.removeDomListeners();
  }
}
