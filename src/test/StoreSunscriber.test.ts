import { StoreType } from "./../core/redux/createStore";
import { Mock } from "../components/MOCK_COMPONENT/Mock";

import { createStore } from "../core/redux/createStore";
import {
  StoreSubscriber,
  StoreSubscriberType,
} from "./../core/redux/StoreSubscriber";
import { $ } from "../core/Utils/dom";
import { PageComponent } from "../core/Components/PageComponent";
describe("test storeSubscriber", () => {
  const initialState = {
    count: 0,
  };

  const reducer = (state = initialState, action: any) => {
    if (action.type === "ADD") {
      return { ...state, count: state.count + 1 };
    }
    return state;
  };
  let sub: StoreSubscriberType;
  let store: StoreType;
  let mock: PageComponent

  let app: any;
  beforeEach(() => {
    store = new createStore(reducer, initialState);

    app = $.create('div', 'app') 
    $(document.body).append(app)

    mock = new PageComponent({
      components: [Mock],
      class: "main",
      store: store,
    });

    app.append(mock.getRoot());
    mock.init()
  });



  test("subscribeComponents should work", () => {
    store.dispatch({ type: "ADD" });
    expect(app.find('.mock')?.html()).toBe('<div class="mock">mock!!!1</div>')
  });

  
  test("subscribeComponents shouldn't work", () => {
    mock.destroy()
    store.dispatch({ type: "ADD" });
    expect(app.find('.mock')?.html()).toBe('<div class="mock">mock!!!0</div>')
  });
});
