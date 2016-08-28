import fetch from 'isomorphic-fetch'

export const REQUEST_SHELF = 'REQUEST_SHELF'
export const RECEIVE_SHELF = 'RECEIVE_SHELF'
export const SELECT_SHELF = 'SELECT_SHELF'

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
    id
  }
}

function fetchShelf(id) {
  return dispatch => {
    dispatch(requestShelf(id))
    return fetch(`https://beta.auchandirect.fr/backend/api/v2/shelves/${id}?shop_id=11223`)
      .then(response => response.json())
      .then(json => dispatch(receiveShelf(id, json)))
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
