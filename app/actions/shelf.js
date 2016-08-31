import fetch from 'isomorphic-fetch'
import _ from 'lodash'
import { countByKey } from '../helpers'
import { removeAllCategoryFilters } from './categoryFilters'

export const REQUEST_SHELF = 'REQUEST_SHELF'
export const REQUEST_SHELF_SUCCESS = 'REQUEST_SHELF_SUCCESS'
export const REQUEST_SHELF_ERROR = 'REQUEST_SHELF_ERROR'

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
    filters: {
      categories: countByKey(json.products, 'category')
    },
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

function fetchShelf(id) {
  return dispatch => {
    dispatch(requestShelf(id))
    return fetch(`https://beta.auchandirect.fr/backend/api/v2/shelves/${id}?shop_id=11223`)
      .then(function(response) {
          if (response.status < 200 || response.status >= 300) {
            return { error: true }
          }
          return response.json()
      })
      .then((json) =>{
        if (json.error) {
          dispatch(shelfError(id, json))
        }else{
          dispatch(receiveShelf(id, json))
        }
      })
      .catch(function(error) {
        dispatch(shelfError(id, { error: true }))
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
    dispatch(removeAllCategoryFilters())
    if (shouldFetchShelf(getState(), id)) {
      return dispatch(fetchShelf(id))
    }
  }
}
