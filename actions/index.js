import fetch from 'isomorphic-fetch'
import _ from 'lodash';

export const SELECT_SHELF = 'SELECT_SHELF'

export const REQUEST_SHELF = 'REQUEST_SHELF'
export const REQUEST_SHELF_SUCCESS = 'REQUEST_SHELF_SUCCESS'
export const REQUEST_SHELF_ERROR = 'REQUEST_SHELF_ERROR'

export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

export const OPEN_NAV = 'OPEN_NAV'
export const CLOSE_NAV = 'CLOSE_NAV'
export const OPEN_CART = 'OPEN_CART'
export const CLOSE_CART = 'CLOSE_CART'

export const ADD_CATEGORY_FILTER = 'ADD_CATEGORY_FILTER'
export const REMOVE_CATEGORY_FILTER = 'REMOVE_CATEGORY_FILTER'

export const ADD_ALL_CATEGORY_FILTERS = 'ADD_ALL_CATEGORY_FILTERS'
export const REMOVE_ALL_CATEGORY_FILTERS = 'REMOVE_ALL_CATEGORY_FILTERS'

export function addAllCategoryFilters(list) {
  return {
    type: ADD_ALL_CATEGORY_FILTERS,
    list
  }
}

export function removeAllCategoryFilters() {
  return {
    type: REMOVE_ALL_CATEGORY_FILTERS
  }
}

export function addCategoryFilter(name) {
  return {
    type: ADD_CATEGORY_FILTER,
    name
  }
}

export function removeCategoryFilter(name) {
  return {
    type: REMOVE_CATEGORY_FILTER,
    name
  }
}

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
    filters: {
      categories: parseCategories(json.products)
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

function parseCategories(products){
  const data = _.countBy(products, 'category');
  if(data['null']){
    delete data['null'];
  }
  return data;
}

function fetchShelf(id) {
  return dispatch => {
    dispatch(requestShelf(id));
    return fetch(`https://beta.auchandirect.fr/backend/api/v2/shelves/${id}?shop_id=11223`)
      .then(function(response) {
          if (response.status < 200 || response.status >= 300) {
            return { error: true };
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
      .catch(function(error) {
        dispatch(shelfError(id, { error: true }));
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

export const openNav = () => { return { type: OPEN_NAV } }
export const closeNav = () => { return { type: CLOSE_NAV } }
export const openCart = () => { return { type: OPEN_CART } }
export const closeCart = () => { return { type: CLOSE_CART } }
