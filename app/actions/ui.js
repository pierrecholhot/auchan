export const OPEN_NAV = 'OPEN_NAV'
export const CLOSE_NAV = 'CLOSE_NAV'

export const OPEN_CART = 'OPEN_CART'
export const CLOSE_CART = 'CLOSE_CART'

export const OPEN_FILTERS = 'OPEN_FILTERS'
export const CLOSE_FILTERS = 'CLOSE_FILTERS'

export const OPEN_SNACKBAR = 'OPEN_SNACKBAR'
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'

export const openNav = () => {
  return { type: OPEN_NAV }
}

export const closeNav = () => {
  return { type: CLOSE_NAV }
}

export const openCart = () => {
  return { type: OPEN_CART }
}

export const closeCart = () => {
  return { type: CLOSE_CART }
}

export const openFiltersPopover = (el) => {
  return { type: OPEN_FILTERS, filtersPopoverAnchorEl: el }
}

export const closeFiltersPopover = () => {
  return { type: CLOSE_FILTERS }
}

export const openSnackbar = (message) => {
  return { type: OPEN_SNACKBAR, snackbarMessage: message }
}

export const closeSnackbar = () => {
  return { type: CLOSE_SNACKBAR }
}
