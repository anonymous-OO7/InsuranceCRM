import {createStore, combineReducers} from 'redux';
import fundReducer from './reducers/Reducer';

const rootReducer = combineReducers({
  fund: fundReducer,
});

const configureStore = () => createStore(rootReducer, {});

export default configureStore;
