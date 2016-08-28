import React, {PropTypes} from 'react';
import { lightBlack } from 'material-ui/styles/colors';

export const ProductCategory = ({category}) => {
  return (<span><b>Catégorie</b>: <span style={{color: lightBlack}}>{category}</span></span>);
}

ProductCategory.propTypes = {
  category: PropTypes.string
};
