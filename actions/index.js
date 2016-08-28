import fetch from 'isomorphic-fetch'

export const REQUEST_SHELF = 'REQUEST_SHELF'
export const RECEIVE_SHELF = 'RECEIVE_SHELF'
export const SELECT_SHELF = 'SELECT_SHELF'
export const SHELF_ERROR = 'SHELF_ERROR'

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
    type: RECEIVE_SHELF,
    items: json.products,
    name: json.name,
    district: json.district.name,
    aisle: json.aisle.name,
    id
  }
}

function shelfError(id, json) {
  return {
    type: SHELF_ERROR,
    error: json.error,
    items: [],
    name: "",
    district: "",
    aisle: "",
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
  if (shelf || (shelf && shelf.isFetching)) {
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
