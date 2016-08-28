import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import { lightBlack, green500 } from 'material-ui/styles/colors';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import {removeFromCart} from '../actions';

class ShoppingCart extends Component {

  constructor(props) {
    super(props)
    this.handleRemoveCart = this.handleRemoveCart.bind(this);
    this.state = { items: [] };
  }

  handleRemoveCart(ev, item, itemIdx){
    this.props.dispatch(removeFromCart(item.props.value));
  }

  componentDidMount(){
    this.props.store.subscribe(()=> {
      this.setState({items: this.props.store.getState().cart});
    });
  }

  render() {
    const { items } = this.state;
    const totalPrice = items.reduce((total, item) => (item.price + total), 0);
    const labelStyles = { maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' };

    return (
      <div>
        <Menu style={{width: 320}} onItemTouchTap={this.handleRemoveCart}>
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
}

ShoppingCart.propTypes = {
  store: PropTypes.object.isRequired
}

export default connect()(ShoppingCart)
