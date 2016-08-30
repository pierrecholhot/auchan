import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import { lightBlack, green500 } from 'material-ui/styles/colors';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

export const ShoppingCart = ({items, handleRemoveFromCart}) => {

  const totalPrice = items.reduce((total, item) => (item.price + total), 0);
  const labelStyles = { maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' };

  return (
    <div>
      <Menu style={{width: 320}} onItemTouchTap={handleRemoveFromCart}>
        {
          items.map(({id, name, price}, i) =>
            <MenuItem
              key={i}
              leftIcon={<DeleteIcon />}
              value={id}
              primaryText={<span style={labelStyles}>{name}</span>}
              secondaryText={<small style={{color: lightBlack}}>{price/100}€</small>}
            />
          )
        }
      </Menu>
      <Subheader>Total de vos achats <strong style={{float: 'right', paddingRight: 16, color: green500}}>{totalPrice/100}&euro;</strong></Subheader>
    </div>
  )
}
