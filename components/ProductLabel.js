import React, {PropTypes} from 'react';
import { lightBlack } from 'material-ui/styles/colors';

export const ProductLabel = ({name, portion, brand}) => {
  return (<span>{name} <small>({portion.toUpperCase()})</small> <small style={{color: lightBlack}}> – {brand}</small></span>);
}

ProductLabel.propTypes = {
  name: PropTypes.string,
  portion: PropTypes.string,
  brand: PropTypes.string
};
