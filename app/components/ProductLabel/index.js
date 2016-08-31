import React, {PropTypes} from 'react'
import { COLOR_FG_SECONDARY } from '@ui/colors'

export const ProductLabel = ({name, portion, brand}) => {
  return <span>{name} <small>({portion.toUpperCase()})</small> <small style={{color: COLOR_FG_SECONDARY}}> – {brand}</small></span>
}

ProductLabel.propTypes = {
  name: PropTypes.string,
  portion: PropTypes.string,
  brand: PropTypes.string
}
