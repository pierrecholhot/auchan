import React, {PropTypes} from 'react'
import styles from './styles'

export const ShelfInfoBar = ({totalProducts, breadcrumb}) => {

  const noProducts = "Aucun produit"
  const numberOfProducts = totalProducts > 1 ? `${totalProducts} produits` : '1 produit'

  return (
    <span style={styles.root}>
      { totalProducts ? numberOfProducts : noProducts } dans votre rayon ( {breadcrumb} )
    </span>
  )
}

ShelfInfoBar.propTypes = {
  totalProducts: PropTypes.number.isRequired,
  breadcrumb: PropTypes.string.isRequired,
}
