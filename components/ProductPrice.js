import React, {PropTypes} from 'react';
import { lightBlack, green500 } from 'material-ui/styles/colors';

export const ProductPrice = ({price, promotion}) => {
  return (
    <span>
      <b>Prix: </b>
      <span style={{color: promotion ? green500 : lightBlack}}>{price/100}&euro;
        { promotion && <strong> (En promotion jusqu'au { promotion.end_date.split('-').reverse().join('/') })</strong> }
      </span>
    </span>
  );
}

ProductPrice.propTypes = {
  price: PropTypes.number,
  promotion: PropTypes.object
};
