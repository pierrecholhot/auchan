import { combineReducers } from 'redux';

import selectedShelf from './selectedShelf';
import shelves from './shelves';

const rootReducer = combineReducers({
  shelves,
  selectedShelf
});

export default rootReducer;
