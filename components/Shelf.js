import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import {addToCart} from '../actions';

import {ProductLabel} from './ProductLabel';
import {ProductPrice} from './ProductPrice';
import {ProductOutOfStock} from './ProductOutOfStock';
import {ProductCategory} from './ProductCategory';

import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';

import AddShoppingCartIcon from 'material-ui/svg-icons/action/add-shopping-cart';
import AlarmAddIcon from 'material-ui/svg-icons/action/alarm-add';

import { red500, green500, lightBlack } from 'material-ui/styles/colors';

class Shelf extends Component {

  handleAddCart(id, name, price){
    return (e) =>{
      this.props.dispatch(addToCart({id, name, price}));
    }
  }

  render() {
    const total = this.props.products.length;
    const products = this.props.products.map((prd, i) => {
      const inStock = !!prd.stock;
      const primaryText = (<ProductLabel name={prd.name} portion={prd.portion_description} brand={prd.brand} />);
      const Price = (<ProductPrice price={prd.price} promotion={prd.promotion} />);
      const category = (<ProductCategory category={prd.category} />);
      const secondaryText = (<p> { inStock ? Price : <ProductOutOfStock /> } <br /> { prd.category && category } </p>);
      const btnAddToCart = (<IconButton onTouchTap={this.handleAddCart(prd.id, prd.name, prd.price)}><AddShoppingCartIcon color={green500} /></IconButton>);
      const btnNotify = (<IconButton><AlarmAddIcon /></IconButton>);
      const productImage = (<Avatar src={prd.picture} />);
      return (
        <div key={i}>
          <Divider inset={true} />
          <ListItem
            primaryText={primaryText}
            secondaryText={secondaryText}
            secondaryTextLines={2}
            leftAvatar={productImage}
            rightIconButton={inStock ? btnAddToCart : btnNotify }
          />
        </div>
      );
    });

    return (
      <List>
        <Subheader>{!total ? "Aucun produit" : (total > 1 ? `${total} produits` : '1 produit')} dans votre rayon ( {this.props.district} > {this.props.aisle} > {this.props.name} )</Subheader>
        { products }
      </List>
    )
  }
}

Shelf.propTypes = {
  products: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  district: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect()(Shelf)
