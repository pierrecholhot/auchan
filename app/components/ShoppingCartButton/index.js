import React, {PropTypes} from 'react'

import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'

import ShoppingCartIcon from 'material-ui/svg-icons/action/shopping-cart'
import styles from './styles'

export const ShoppingCartButton = ({total, handleOpenCart}) => {
  return (
    <Chip
      style={styles.root}
      onTouchTap={handleOpenCart}
      backgroundColor={styles.rootBgColor}
    >
      <Avatar
        color={styles.avatarColor}
        backgroundColor={styles.avatarBgColor}
        icon={<ShoppingCartIcon />}
      />
      { total }
    </Chip>
  )
}

ShoppingCartButton.propTypes = {
  total: PropTypes.number.isRequired,
  handleOpenCart: PropTypes.func.isRequired,
}
