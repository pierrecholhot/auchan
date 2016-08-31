export const ADD_CATEGORY_FILTER = 'ADD_CATEGORY_FILTER'
export const REMOVE_CATEGORY_FILTER = 'REMOVE_CATEGORY_FILTER'

export const ADD_ALL_CATEGORY_FILTERS = 'ADD_ALL_CATEGORY_FILTERS'
export const REMOVE_ALL_CATEGORY_FILTERS = 'REMOVE_ALL_CATEGORY_FILTERS'

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
