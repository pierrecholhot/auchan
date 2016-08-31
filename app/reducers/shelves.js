import shelf from '@reducers/shelf'

import {
  REQUEST_SHELF,
  REQUEST_SHELF_ERROR,
  REQUEST_SHELF_SUCCESS
} from '@actions'

function shelves(state = {}, action) {
  switch (action.type) {
    case REQUEST_SHELF:
    case REQUEST_SHELF_ERROR:
    case REQUEST_SHELF_SUCCESS:
      return Object.assign({}, state, {
        [action.id]: shelf(state[action.id], action)
      })
    default:
      return state
  }
}

export default shelves
