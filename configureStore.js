import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension'

import { verifyAuth } from "./src/store/actions"; 
import rootReducer from "./src/store/reducers";

export default function configureStore(persistedState) {
  const store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools(
      applyMiddleware(thunkMiddleware)
    )

  );
   store.dispatch(verifyAuth()); 
  return store;
}

