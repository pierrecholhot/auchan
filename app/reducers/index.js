import { combineReducers } from 'redux'

import selectedShelf from './selectedShelf'
import shelves from './shelves'
import cart from './cart'
import ui from './ui'
import categoryFilters from './categoryFilters'

const rootReducer = combineReducers({
  ui,
  cart,
  shelves,
  selectedShelf,
  categoryFilters
});

export default rootReducer
