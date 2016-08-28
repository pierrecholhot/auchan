import React, {PropTypes} from 'react';
import { lightBlack, green500 } from 'material-ui/styles/colors';

export const ProductPrice = ({price, promotion}) => {
  const styles = {
    color: promotion ? green500 : lightBlack
  };
  return (
    <span>
      <b>Prix: </b>
      <span style={styles}>{price/100}&euro; { promotion && <strong>(En promotion jusqu'au { promotion.end_date.split('-').reverse().join('/') })</strong> }</span>
    </span>
  );
}

ProductPrice.propTypes = {
  price: PropTypes.number,
  promotion: PropTypes.object
};
