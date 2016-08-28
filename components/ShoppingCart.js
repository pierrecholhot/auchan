import React, { Component, PropTypes } from 'react'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import { lightBlack, green500 } from 'material-ui/styles/colors';
import Delete from 'material-ui/svg-icons/action/delete';

export default class ShoppingCart extends Component {
  render() {
    const { items } = this.props;
    const totalPrice = 159.63;

    return (
      <div>
        <Menu style={{width: 320}}>
          {
            items.map((name, i) =>
              <MenuItem key={i} leftIcon={<Delete />} primaryText={
                <span>
                  { name } <small style={{color: lightBlack, float: 'right'}}>53.21€</small>
                </span>
              } />
            )
          }
        </Menu>
        <Subheader>Total de vos achats <strong style={{float: 'right', paddingRight: 16, color: green500}}>{totalPrice}&euro;</strong></Subheader>
      </div>
    )
  }
}

ShoppingCart.propTypes = {
  items: PropTypes.array.isRequired
}
