import { Router } from "./core/Router/Router";
import "./scss/index.scss";
import "./lib/datepicker/the-datepicker.scss";
import { Header } from "./components/Header/Header";
import { WrapperComponents } from "./core/Components/WrapperComponents";
import { $ } from "./core/Utils/dom";
import { createStore } from "./core/redux/createStore";
import { rootReducer } from "./redux/rootReducer";
import { initialState } from "./redux/initialState";

import { Main } from "./components/Main";
import { SearchProduct } from "./components/SearchProduct/SearchProduct";

const store = new createStore(rootReducer, initialState);
const main = new WrapperComponents({
  components: [Header, Main],
  class: "main",
  store: store,
});
const search = new WrapperComponents({
  components: [Header, SearchProduct],
  class: "search",
  store: store,
});

new Router("#app", {
  "": main,
  search: search,
});
