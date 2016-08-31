import React, {PropTypes} from 'react'
import { COLOR_FG_SECONDARY } from '@ui/colors'

export const ProductCategory = ({category}) => {
  return <span><b>Catégorie</b>: <span style={{color: COLOR_FG_SECONDARY}}>{category}</span></span>
}

ProductCategory.propTypes = {
  category: PropTypes.string
}
