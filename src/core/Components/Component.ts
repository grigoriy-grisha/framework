import { DomListener } from "./DomListener";
import { isEqual } from "../Utils/utils";

export class Component extends DomListener {
  protected name: string;
  store: any;
  state: any;
  subscribe: Array<string>;
  constructor(protected $root: any, protected options: any) {
    super($root, options.listeners, options.className);
    this.name = options.name || "";
    this.store = options.store;
    this.subscribe = options.subscribe;
    console.log();
    
    this.prepare();
  }

  prepare() {}

  initState(initialState = {}) {
    this.state = { ...initialState };
  }
  $getState() {
    return this.store.getState()
  }

  setState(newState: any) {
    const nextState = { ...this.state, ...newState }
    if (!isEqual(this.state,nextState )) {
      this.state = nextState;
      this.$root.html(this.toHTML())
    }
    
    
  }
  $dispatch(action: any) {
    const prevState = this.store.getState()

    this.store.dispatch(action);

    if (!isEqual(prevState ,this.store )) {
      this.$root.html(this.toHTML())
    }
    
  }
  toHTML() {
    return ``;
  }

  storeChanged(change: any) {}

  isWatching(key: any) {
    return this.subscribe.includes(key);
  }

  init() {
    this.initDomListeners();
  }

  destroy() {
    this.removeDomListeners();
  }
}
