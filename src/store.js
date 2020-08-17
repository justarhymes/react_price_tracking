import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

import api from "./api/priceApi";
import reducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk.withExtraArgument({ api })))
);

export default store;
