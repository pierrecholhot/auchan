import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { formatPrice } from '@helpers'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Subheader from 'material-ui/Subheader'
import DeleteIcon from 'material-ui/svg-icons/content/remove-circle-outline'

import i18n from '@ui/i18n'
import styles from './styles'

export const ShoppingCart = ({items, handleRemoveFromCart}) => {

  const totalPrice = items.reduce((total, item) => (item.price + total), 0)

  const cartItems = items.map(({id, name, price}, i) =>
    <MenuItem
      key={i}
      leftIcon={<DeleteIcon color={styles.deleteIconColor} />}
      innerDivStyle={styles.itemInner}
      value={id}
      primaryText={<span style={styles.labelPrimary}>{name}</span>}
      secondaryText={<small style={styles.labelSecondary}>{ formatPrice(price) }</small>}
    />
  )

  const onItemTouchTap = (ev, item, itemIdx) => {
    handleRemoveFromCart(item.props.value)
  }

  return (
    <div>
      <Menu style={styles.menu} onItemTouchTap={onItemTouchTap}>
        { cartItems.length ? cartItems : <MenuItem primaryText={i18n.cartEmpty} disabled={true} style={styles.cartEmpty} /> }
      </Menu>
      <Subheader>
        <div style={styles.rootTotal}>
          {i18n.yourTotal} <strong style={styles.labelTotal}>{ formatPrice(totalPrice) }</strong>
        </div>
      </Subheader>
    </div>
  )
}
