import React, {PropTypes} from 'react'
import styles from './styles'

export const ProductCategory = ({category}) => {
  return <span><b>Catégorie</b>: <span style={styles.text}>{category}</span></span>
}

ProductCategory.propTypes = {
  category: PropTypes.string
}
