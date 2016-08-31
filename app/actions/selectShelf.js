export const SELECT_SHELF = 'SELECT_SHELF'

export function selectShelf(id) {
  return {
    type: SELECT_SHELF,
    id
  }
}
