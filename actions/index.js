import fetch from 'isomorphic-fetch'

export const REQUEST_SHELF = 'REQUEST_SHELF'
export const REQUEST_SHELF_SUCCESS = 'REQUEST_SHELF_SUCCESS'
export const SELECT_SHELF = 'SELECT_SHELF'
export const REQUEST_SHELF_ERROR = 'REQUEST_SHELF_ERROR'
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

export function selectShelf(id) {
  return {
    type: SELECT_SHELF,
    id
  }
}

function requestShelf(id) {
  return {
    type: REQUEST_SHELF,
    id
  }
}

function receiveShelf(id, json) {
  return {
    type: REQUEST_SHELF_SUCCESS,
    items: json.products,
    name: json.name,
    district: json.district.name,
    aisle: json.aisle.name,
    id
  }
}

function shelfError(id, json) {
  return {
    type: REQUEST_SHELF_ERROR,
    error: json.error,
    items: [],
    name: "",
    district: "",
    aisle: "",
    id
  }
}

export const addToCart = ({id, name, price}) => {
  return {
    type: ADD_TO_CART,
    id, name, price
  }
}

export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    id
  }
}

function fetchShelf(id) {
  return dispatch => {
    dispatch(requestShelf(id))
    return fetch(`https://beta.auchandirect.fr/backend/api/v2/shelves/${id}?shop_id=11223`)
      .then(function(response) {
          if (response.status >= 400) {
              return { error: "Bad response from server" };
          }
          return response.json();
      })
      .then((json) =>{
        if (json.error) {
          dispatch(shelfError(id, json));
        }else{
          dispatch(receiveShelf(id, json));
        }
      })
  }
}

function shouldFetchShelf(state, id) {
  const shelf = state.shelves[id]
  if (shelf || (shelf && shelf.isFetching) || (shelf && !shelf.error)) {
    return false
  }
  return true
}

export function fetchShelfIfNeeded(id) {
  return (dispatch, getState) => {
    if (shouldFetchShelf(getState(), id)) {
      return dispatch(fetchShelf(id))
    }
  }
}
