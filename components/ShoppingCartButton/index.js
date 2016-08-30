import React, {PropTypes} from 'react';

import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

import ShoppingCartIcon from 'material-ui/svg-icons/action/shopping-cart';
import { deepPurple500, white500 } from 'material-ui/styles/colors';

export const ShoppingCartButton = ({total, handleOpenCart}) => {
  return (
    <Chip
      style={{margin: '8px 4px 0 0'}}
      onTouchTap={handleOpenCart}
      backgroundColor={white500}
    >
      <Avatar
        color={white500}
        backgroundColor={deepPurple500}
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
