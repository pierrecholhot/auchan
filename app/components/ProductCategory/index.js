import React, {PropTypes} from 'react'
import styles from './styles'
import i18n from '@ui/i18n'

export const ProductCategory = ({category}) => {
  return <span><b>{i18n.category}</b>: <span style={styles.text}>{category}</span></span>
}

ProductCategory.propTypes = {
  category: PropTypes.string
}
