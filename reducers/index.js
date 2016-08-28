import { combineReducers } from 'redux'
import {
  SELECT_SHELF,
  REQUEST_SHELF,
  RECEIVE_SHELF,
  SHELF_ERROR
} from '../actions'

function selectedID(state = '23', action) {
  switch (action.type) {
    case SELECT_SHELF:
      return action.id
    default:
      return state
  }
}


const shelfState = {
  isFetching:false,
  error: false,
  items:[],
  name:"",
  district:"",
  aisle:""
};

function shelf(state = shelfState, action) {
  switch (action.type) {
    case SHELF_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })
    case REQUEST_SHELF:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_SHELF:
      return Object.assign({}, state, {
        isFetching: false,
        error: false,
        items: action.items,
        name: action.name,
        district: action.district,
        aisle: action.aisle
      })
    default:
      return state
  }
}

function shelves(state = {}, action) {
  switch (action.type) {
    case SHELF_ERROR:
    case RECEIVE_SHELF:
    case REQUEST_SHELF:
      return Object.assign({}, state, {
        [action.id]: shelf(state[action.id], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  shelves,
  selectedID
})

export default rootReducer
