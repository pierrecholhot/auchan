import React, {PropTypes} from 'react'
import { formatPrice, frenchifyDate } from '@helpers'
import styles from './styles'
import i18n from '@ui/i18n'

export const ProductPrice = ({price, promotion}) => {

  const rootStyles = styles[promotion ? 'promo' : 'price']
  const displayPromotion = promotion && <strong>({i18n.promotionUntil} { frenchifyDate(promotion.end_date) })</strong>

  return (
    <span>
      <b>Prix: </b>
      <span style={rootStyles}>{formatPrice(price)} {displayPromotion}</span>
    </span>
  )
}

ProductPrice.propTypes = {
  price: PropTypes.number,
  promotion: PropTypes.object
}
