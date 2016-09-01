import React, {PropTypes} from 'react'
import i18n from '@ui/i18n'
import styles from './styles'

export const ShelfInfoBar = ({totalProducts, breadcrumb}) => {

  const numberOfProducts = totalProducts > 1 ? `${totalProducts} ${i18n.products}` : i18n.oneProduct

  return (
    <span style={styles.root}>
      { totalProducts ? numberOfProducts : i18n.noProducts } { i18n.inShelf } ( {breadcrumb} )
    </span>
  )
}

ShelfInfoBar.propTypes = {
  totalProducts: PropTypes.number.isRequired,
  breadcrumb: PropTypes.string.isRequired,
}
