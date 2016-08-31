import { SELECT_SHELF } from '@actions'

const initialState = '23'

function selectedShelf(state = initialState, action) {
  switch (action.type) {
    case SELECT_SHELF:
      return action.id
    default:
      return state
  }
}

export default selectedShelf
