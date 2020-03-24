import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';

console.log('>which process', process.env.NODE_ENV);

function getCompose() {
  const withDevtools =
    process.env.NODE_ENV === 'development' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  if (withDevtools) {
    return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }
  return compose;
}

const composeEnhancers = getCompose();

const middlewares = composeEnhancers(applyMiddleware(thunk));

const store = createStore(reducers, middlewares);

export default store;
