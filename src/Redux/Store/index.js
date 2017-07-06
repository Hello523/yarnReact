import { createStore,combineReducers,applyMiddleware,compose} from 'redux';

import  createSagaMiddleware from 'redux-saga';

import initailState from '../initailState';
import Reducers from '../Reducers';
import rootSagas from '../Sagas';

var sagaMiddleware = createSagaMiddleware();

var store = createStore(combineReducers(Reducers), initailState, compose( applyMiddleware(sagaMiddleware)));



store.runSaga = sagaMiddleware.run;
store.runSaga(rootSagas);


export default  store;

