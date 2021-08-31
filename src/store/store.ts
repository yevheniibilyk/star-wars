import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import { Action, AppState, DispatchType } from './type';

const store: Store<AppState, Action> & {
  dispatch: DispatchType
} = createStore(reducer, applyMiddleware(thunk))

export default store;
