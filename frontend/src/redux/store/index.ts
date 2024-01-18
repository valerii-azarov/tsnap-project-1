import { createStore, applyMiddleware, compose, AnyAction } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import rootReducer from "../reducers";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
