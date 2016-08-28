import {
  ADD_TO_CART,
  REMOVE_FROM_CART
} from '../actions'

const initialState = [];

function cart(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, {
        id: action.id,
        name: action.name,
        price: action.price
      }]
    case REMOVE_FROM_CART:
      return state.filter(function(item){
        return item.id !== action.id;
      })
    default:
      return state
  }
}

export default cart;
