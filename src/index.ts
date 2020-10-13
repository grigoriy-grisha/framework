import { Router } from "./core/Router/Router";
import "./scss/index.scss";
import { Header } from "./components/Header/Header";
import { PageComponent } from "./core/Components/PageComponent";
import { createStore } from "./core/redux/createStore";
import { rootReducer } from "./redux/rootReducer";
import { initialState } from "./redux/initialState";
import { Main } from "./components/Main";
import { SearchProduct } from "./components/SearchProduct/SearchProduct";
import { initState, storage } from "./core/Utils/utils";
import { storageName } from "./constants";
import { Product } from "./components/Product/Product";




const state = initState(storageName, initialState);
const store = new createStore(rootReducer, state);




const main = new PageComponent({
  components:  [Header, Main],
  class: "main",
  store: store,
});


const search = new PageComponent({
  components: [Header, SearchProduct],
  class: "search",
  store: store,
});
const product = new PageComponent({
  components: [Header, Product],
  class: "product",
  store: store,
});

store.subscribe((state: any) => {
  storage(storageName, state);
});

const options = {
  "": main,
  search: search,
  "search/:id": product,
}

new Router("#app", options);
