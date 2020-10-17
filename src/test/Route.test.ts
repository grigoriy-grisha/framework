
import { Mock } from "../components/MOCK_COMPONENT/Mock";
import { PageComponent } from "../core/Components/PageComponent";
import { createStore } from "../core/redux/createStore";
import { $, DomInstanseType } from "../core/Utils/dom";
import { Router } from "./../core/Router/Router";

const initialState = {
  count: 0,
};

const reducer = (state = initialState, action: any) => {
  if (action.type === "ADD") {
    return { ...state, count: state.count + 1 };
  }
  return state;
};


describe("testing route", () => {
  let route: Router;
  let app: DomInstanseType
  beforeEach(() => {
    app = $.create('div', 'app') 
    $(document.body).append(app)

    const store = new createStore(reducer, initialState);
    const mock = new PageComponent({
      components: [Mock],
      class: "main",
      store: store,
    });

    route = new Router(".app", {
      "": mock,
    });
  });
  test("handlerhash should be called", () => {
    route.handlerhash()
    window.location.hash = ''
    expect(app.find('.mock')?.html()).toBe('<div class="mock">mock!!!0</div>')
  });
});
