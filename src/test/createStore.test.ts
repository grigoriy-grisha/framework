import { createStore } from "../core/redux/createStore";

const initialState = {
  count: 0,
};
type a = typeof initialState;
const reducer = (state = initialState, action: any) => {
  if (action.type === "ADD") {
    return { ...state, count: state.count + 1 };
  }
  return state;
};

describe("return store object", () => {
  let store: any;
  let handler: any;

  beforeEach(() => {
    store = new createStore(reducer, initialState);
    handler = jest.fn();

    
  });

  test("test", () => {
    expect(store).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.getState).toBeDefined();
    expect(store.subscribe).toBeDefined();
  });
  test("should return object as a state", () => {
    expect(store.getState()).toBeInstanceOf(Object);
  });
  test("should return defualt state", () => {
    expect(store.getState()).toEqual(initialState);
  });
  test("should chanage state if actions exist", () => {
    store.dispatch({ type: "ADD" });
    expect(store.getState().count).toBe(1);
  });
  test("should NOT chanage state if actions do not exist", () => {
    store.dispatch({ type: "NOT_EXISTING" });
    expect(store.getState().count).toBe(0);
  });
  test("should call subscriber function", () => {
    store.subscribe(handler);

    store.dispatch({ type: "ADD" });

    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(store.getState());
  });

  test("should NOT call sub id unsubscribe", () => {
    const unsub = store.subscribe(handler);

    unsub.unsubscribe();

    store.dispatch({ type: "ADD" });

    expect(handler).not.toHaveBeenCalled();


    // expect(handler).toHaveBeenCalledWith(store.getState())
  });
});
