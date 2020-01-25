import {applyMiddleware, createStore, compose, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import {redux} from  'moon-runtime';
//@ts-ignore
const composeEnhancers =__DEV__ &&
  typeof window === 'object' &&
  window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] ?
    window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;




const middlewares = [
  thunkMiddleware
]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(require('redux-logger').createLogger())
}

const middlewareEnhancer = applyMiddleware(...middlewares);
const composedEnhancers = composeEnhancers(middlewareEnhancer);

let GolbalStore = createStore(
  combineReducers(rootReducer),
  undefined,
  composedEnhancers,
);

redux.storeContext.init(GolbalStore,rootReducer);

export default GolbalStore;
