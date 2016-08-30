import {
  ADD_CATEGORY_FILTER,
  REMOVE_CATEGORY_FILTER,
  ADD_ALL_CATEGORY_FILTERS,
  REMOVE_ALL_CATEGORY_FILTERS
} from '../actions'

const initialState = [];

function categoryFilters(state = initialState, action) {
  switch (action.type) {
    case ADD_CATEGORY_FILTER:
      return [...state, action.name]
    case REMOVE_CATEGORY_FILTER:
      return state.filter(function(item){
        return item !== action.name;
      })
    case ADD_ALL_CATEGORY_FILTERS:
      return action.list;
    case REMOVE_ALL_CATEGORY_FILTERS:
      return [];
    default:
      return state
  }
}

export default categoryFilters;
