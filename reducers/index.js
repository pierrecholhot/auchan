import { combineReducers } from 'redux';

import selectedShelf from './selectedShelf';
import shelves from './shelves';
import cart from './cart';
import ui from './ui';

const rootReducer = combineReducers({
  ui,
  cart,
  shelves,
  selectedShelf
});

export default rootReducer;
