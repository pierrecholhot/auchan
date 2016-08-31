import React, {PropTypes} from 'react';

import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

import ShoppingCartIcon from 'material-ui/svg-icons/action/shopping-cart';
import { COLOR_BG_SECONDARY, COLOR_SECONDARY } from '../../helpers/ui/colors';

export const ShoppingCartButton = ({total, handleOpenCart}) => {
  return (
    <Chip
      style={{margin: '8px 4px 0 0'}}
      onTouchTap={handleOpenCart}
      backgroundColor={COLOR_BG_SECONDARY}
    >
      <Avatar
        color={COLOR_BG_SECONDARY}
        backgroundColor={COLOR_SECONDARY}
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
