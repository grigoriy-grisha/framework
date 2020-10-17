import { initialStateType } from './../../redux/initialState';
import { isEqual } from "../Utils/utils";

export class StoreSubscriber {
  protected sub: any;
  protected prevState: any;
  constructor(protected store: any) {
    this.store = store;
    this.sub = null;
    this.prevState = {};
  }

  subscribeComponents(components: any) {
    this.prevState = this.store.getState();

    
    this.sub = this.store.subscribe((state: any) => {
    
      Object.keys(state).forEach((key: string) => {
        if (!isEqual(this.prevState[key], state[key])) {
          components.forEach((component: any) => {

              
            if (component.isWatching(key)) {
              const changes = {
                [key]: state[key],
              };
              component.storeChanged(changes);
            }
          });
        }
      });

      this.prevState = this.store.getState();
    });
  }

  unsubscribeComponents() {   
    console.log(this.sub);
    
    this.sub.unsubscribe();
    console.log(this.sub);
    
  }
}



export type StoreSubscriberType = StoreSubscriber