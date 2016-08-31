import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import { lightBlack, blueGrey700 } from 'material-ui/styles/colors';
import DeleteIcon from 'material-ui/svg-icons/content/remove-circle-outline';

export const ShoppingCart = ({items, handleRemoveFromCart}) => {

  const totalPrice = items.reduce((total, item) => (item.price + total), 0);
  const labelStyles = { maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' };

  const cartItems = items.map(({id, name, price}, i) =>
    <MenuItem
      key={i}
      leftIcon={<DeleteIcon color={blueGrey700} />}
      innerDivStyle={{paddingLeft: 56}}
      value={id}
      primaryText={<span style={labelStyles}>{name}</span>}
      secondaryText={<small style={{color: lightBlack}}>{price/100}€</small>}
    />
  );

  const onItemTouchTap = (ev, item, itemIdx) => {
    handleRemoveFromCart(item.props.value);
  }

  return (
    <div>
      <Menu style={{width: 320}} onItemTouchTap={onItemTouchTap}>
        { cartItems.length ? cartItems : <MenuItem primaryText='Votre panier est vide!' disabled={true} style={{textAlign: 'center'}} /> }
      </Menu>
      <Subheader>
        <div style={{marginRight: 16, borderTop: '1px solid #ccc'}}>
          Total de vos achats <strong style={{float: 'right', color: blueGrey700, fontSize: '1.2em'}}>{totalPrice/100}&euro;</strong>
        </div>
      </Subheader>
    </div>
  )
}
