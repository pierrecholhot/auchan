import React, {PropTypes} from 'react'
import styles from './styles'

export const ProductLabel = ({name, portion, brand}) => {
  return <span>{name} <small style={styles.portion}>({portion})</small> <small style={styles.brand}> – {brand}</small></span>
}

ProductLabel.propTypes = {
  name: PropTypes.string,
  portion: PropTypes.string,
  brand: PropTypes.string
}
