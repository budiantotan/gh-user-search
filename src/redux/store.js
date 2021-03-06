import { createStore } from "redux";
import rootReducer from "./reducers";

export default (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || undefined
  );
}
