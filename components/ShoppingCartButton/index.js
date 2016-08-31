import React, {PropTypes} from 'react';

import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

import ShoppingCartIcon from 'material-ui/svg-icons/action/shopping-cart';
import { white400, teal400 } from 'material-ui/styles/colors';

export const ShoppingCartButton = ({total, handleOpenCart}) => {
  return (
    <Chip
      style={{margin: '8px 4px 0 0'}}
      onTouchTap={handleOpenCart}
      backgroundColor={white400}
    >
      <Avatar
        color={white400}
        backgroundColor={teal400}
        icon={<ShoppingCartIcon />}
      />
      { total }
    </Chip>
  );
}

ShoppingCartButton.propTypes = {
  total: PropTypes.number.isRequired,
  handleOpenCart: PropTypes.func.isRequired,
};
