import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { formatPrice } from '@helpers'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Subheader from 'material-ui/Subheader'
import DeleteIcon from 'material-ui/svg-icons/content/remove-circle-outline'
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
      secondaryText={<small style={styles.labelSecondary}>{formatPrice(price)}</small>}
    />
  )

  const onItemTouchTap = (ev, item, itemIdx) => {
    handleRemoveFromCart(item.props.value)
  }

  return (
    <div>
      <Menu style={{width: 320}} onItemTouchTap={onItemTouchTap}>
        { cartItems.length ? cartItems : <MenuItem primaryText='Votre panier est vide :-(' disabled={true} style={styles.cartEmpty} /> }
      </Menu>
      <Subheader>
        <div style={styles.rootTotal}>
          Total de vos achats <strong style={styles.labelTotal}>{formatPrice(totalPrice)}</strong>
        </div>
      </Subheader>
    </div>
  )
}
