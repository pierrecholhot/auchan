import React, {PropTypes} from 'react'
import { COLOR_FG_SECONDARY, COLOR_SECONDARY } from '@ui/colors'

export const ProductPrice = ({price, promotion}) => {
  const styles = {
    color: promotion ? COLOR_SECONDARY : COLOR_FG_SECONDARY
  }
  return (
    <span>
      <b>Prix: </b>
      <span style={styles}>{price/100}&euro; { promotion && <strong>(En promotion jusqu'au { promotion.end_date.split('-').reverse().join('/') })</strong> }</span>
    </span>
  )
}

ProductPrice.propTypes = {
  price: PropTypes.number,
  promotion: PropTypes.object
}
