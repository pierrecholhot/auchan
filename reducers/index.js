import { combineReducers } from 'redux'
import {
  SELECT_REDDIT, INVALIDATE_REDDIT,
  REQUEST_SHELF, RECEIVE_SHELF
} from '../actions'

function selectedID(state = '23', action) {
  switch (action.type) {
    case SELECT_REDDIT:
      return action.id
    default:
      return state
  }
}

function shelf(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_REDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_SHELF:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_SHELF:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.shelf,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function shelves(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_REDDIT:
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
