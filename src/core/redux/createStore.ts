import { initialStateType } from './../../redux/initialState';


export class createStore {
  protected state: initialStateType;
  protected listeners: Array<(...args: any) => any>;
  constructor(
    protected rootReducer: any,
    protected initialState?: any
  ) {
    this.state = rootReducer({ ...initialState }, { type: "__INIT__" });
    this.listeners = [];
    this.rootReducer = rootReducer;
  }

  dispatch<T>(action: T) {
    this.state = this.rootReducer(this.state, action);
    this.listeners.forEach((listener: (...args: any) => any) =>
      listener(this.state)
    );
  }

  getState() {
    return JSON.parse(JSON.stringify(this.state));
  }

  subscribe(fn: (...args: any) => any) {
    this.listeners.push(fn);

    
    return {
      unsubscribe: () => {        
        this.listeners = this.listeners.filter((l: (...args: any) => any) => l !== fn);
      },
    };
  }
}



export type StoreType = createStore

