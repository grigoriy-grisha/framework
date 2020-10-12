export class createStore {
  state: any;
  listeners: any;
  constructor(protected rootReducer: any, protected initialState: any) {
    this.state = rootReducer({ ...initialState }, { type: "__INIT__" });
    this.listeners = [];
    this.rootReducer = rootReducer;
  }

  dispatch<T>(action: T) {
    this.state = this.rootReducer(this.state, action);
    this.listeners.forEach((listener: any) => listener(this.state));
  }

  getState() {
    return JSON.parse(JSON.stringify(this.state));
  }

  subscribe(fn: any) {
    this.listeners.push(fn);

    return {
      unsubscribe: () => {
        this.listeners.filter((l: any) => l !== fn);
      },
    };
  }
}


export type StoreType = createStore