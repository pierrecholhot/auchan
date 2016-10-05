export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

export const addToCart = ({id, name, price, uid}) => {
  return {
    type: ADD_TO_CART,
    id, name, price, uid
  }
}

export const removeFromCart = (uid) => {
  return {
    type: REMOVE_FROM_CART,
    uid
  }
}
