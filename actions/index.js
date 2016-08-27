import fetch from 'isomorphic-fetch'

export const REQUEST_SHELF = 'REQUEST_SHELF'
export const RECEIVE_SHELF = 'RECEIVE_SHELF'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

export function selectID(id) {
  return {
    type: SELECT_REDDIT,
    id
  }
}

export function invalidateID(id) {
  return {
    type: INVALIDATE_REDDIT,
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
    id,
    shelf: json.products,
    receivedAt: Date.now()
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
  if (!shelf) {
    return true
  }
  if (shelf.isFetching) {
    return false
  }
  return shelf.didInvalidate
}

export function fetchShelfIfNeeded(id) {
  return (dispatch, getState) => {
    if (shouldFetchShelf(getState(), id)) {
      return dispatch(fetchShelf(id))
    }
  }
}
