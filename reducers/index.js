import { combineReducers } from 'redux';

import selectedShelf from './selectedShelf';
import shelves from './shelves';
import cart from './cart';

const rootReducer = combineReducers({
  cart,
  shelves,
  selectedShelf
});

export default rootReducer;
