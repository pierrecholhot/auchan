import { combineReducers } from 'redux'

import ui from '@reducers/ui'
import cart from '@reducers/cart'
import shelves from '@reducers/shelves'
import selectedShelf from '@reducers/selectedShelf'
import categoryFilters from '@reducers/categoryFilters'

const rootReducer = combineReducers({
  ui,
  cart,
  shelves,
  selectedShelf,
  categoryFilters
})

export default rootReducer
