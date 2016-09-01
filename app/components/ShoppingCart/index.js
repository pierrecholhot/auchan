import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { formatPrice } from '@helpers'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Subheader from 'material-ui/Subheader'
import DeleteIcon from 'material-ui/svg-icons/content/remove-circle-outline'
import { COLOR_FG_SECONDARY, COLOR_TERTIARY } from '@ui/colors'

export const ShoppingCart = ({items, handleRemoveFromCart}) => {

  const totalPrice = items.reduce((total, item) => (item.price + total), 0)
  const labelStyles = { maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }

  const cartItems = items.map(({id, name, price}, i) =>
    <MenuItem
      key={i}
      leftIcon={<DeleteIcon color={COLOR_TERTIARY} />}
      innerDivStyle={{paddingLeft: 56}}
      value={id}
      primaryText={<span style={labelStyles}>{name}</span>}
      secondaryText={<small style={{color: COLOR_FG_SECONDARY}}>{formatPrice(price)}</small>}
    />
  )

  const onItemTouchTap = (ev, item, itemIdx) => {
    handleRemoveFromCart(item.props.value)
  }

  return (
    <div>
      <Menu style={{width: 320}} onItemTouchTap={onItemTouchTap}>
        { cartItems.length ? cartItems : <MenuItem primaryText='Votre panier est vide :-(' disabled={true} style={{textAlign: 'center'}} /> }
      </Menu>
      <Subheader>
        <div style={{marginRight: 16, borderTop: '1px solid #ccc'}}>
          Total de vos achats <strong style={{float: 'right', color: COLOR_TERTIARY, fontSize: '1.2em'}}>{formatPrice(totalPrice)}</strong>
        </div>
      </Subheader>
    </div>
  )
}
