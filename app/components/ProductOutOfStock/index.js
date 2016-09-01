import React, {PropTypes} from 'react'
import i18n from '@ui/i18n'
import styles from './styles'

export const ProductOutOfStock = () => {
  return (<strong style={styles.text}>{i18n.productOutOfStock}</strong>)
}
