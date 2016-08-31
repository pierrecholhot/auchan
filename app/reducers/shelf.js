import {
  REQUEST_SHELF,
  REQUEST_SHELF_ERROR,
  REQUEST_SHELF_SUCCESS,
} from '@actions'

const initialState = {
  isFetching:false,
  error: false,
  items: [],
  name: "",
  district: "",
  aisle: "",
  filters: {}
};

function shelf(state = initialState, action) {
  switch (action.type) {
    case REQUEST_SHELF:
      return Object.assign({}, state, {
        isFetching: true
      })
    case REQUEST_SHELF_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })
    case REQUEST_SHELF_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        error: false,
        items: action.items,
        filters: action.filters,
        name: action.name,
        district: action.district,
        aisle: action.aisle
      })
    default:
      return state
  }
}

export default shelf
