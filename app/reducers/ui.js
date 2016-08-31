import {
  OPEN_NAV,
  CLOSE_NAV,
  OPEN_CART,
  CLOSE_CART
} from '../actions'

const initialState = {
  navOpen: false,
  cartOpen: false
};

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
    default:
      return state
  }
}

export default ui
