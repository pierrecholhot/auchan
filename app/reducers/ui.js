import {
  OPEN_NAV,
  CLOSE_NAV,
  OPEN_CART,
  CLOSE_CART,
  OPEN_FILTERS,
  CLOSE_FILTERS,
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR,
} from '@actions'

const initialState = {
  navOpen: false,
  cartOpen: false,
  filtersPopoverOpen: false,
  filtersPopoverAnchorEl: null,
  snackbarOpen: false,
  snackbarMessage: '',
}

function ui(state = initialState, action) {
  switch (action.type) {
    case OPEN_NAV:
      return Object.assign({}, state, { navOpen: true })
    case CLOSE_NAV:
      return Object.assign({}, state, { navOpen: false })
    case OPEN_CART:
      return Object.assign({}, state, { cartOpen: true })
    case CLOSE_CART:
      return Object.assign({}, state, { cartOpen: false })
    case OPEN_FILTERS:
      return Object.assign({}, state, { filtersPopoverOpen: true, filtersPopoverAnchorEl: action.filtersPopoverAnchorEl })
    case CLOSE_FILTERS:
      return Object.assign({}, state, { filtersPopoverOpen: false })
    case OPEN_SNACKBAR:
      return Object.assign({}, state, { snackbarOpen: true, snackbarMessage: action.snackbarMessage })
    case CLOSE_SNACKBAR:
      return Object.assign({}, state, { snackbarOpen: false, snackbarMessage: '' })
    default:
      return state
  }
}

export default ui
