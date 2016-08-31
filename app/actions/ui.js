export const OPEN_NAV = 'OPEN_NAV'
export const CLOSE_NAV = 'CLOSE_NAV'

export const OPEN_CART = 'OPEN_CART'
export const CLOSE_CART = 'CLOSE_CART'

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
