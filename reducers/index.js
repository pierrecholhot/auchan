import { combineReducers } from 'redux'
import {
  SELECT_SHELF,
  REQUEST_SHELF, RECEIVE_SHELF
} from '../actions'

function selectedID(state = '23', action) {
  switch (action.type) {
    case SELECT_SHELF:
      return action.id
    default:
      return state
  }
}

function shelf(state = {isFetching: false, items: []}, action) {
  switch (action.type) {
    case REQUEST_SHELF:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_SHELF:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items
      })
    default:
      return state
  }
}

function shelves(state = {}, action) {
  switch (action.type) {
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
