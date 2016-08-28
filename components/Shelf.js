import React, { PropTypes, Component } from 'react'

import {ProductLabel} from './ProductLabel';
import {ProductPrice} from './ProductPrice';
import {ProductOutOfStock} from './ProductOutOfStock';
import {ProductCategory} from './ProductCategory';

import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';

import IconAddToShppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import IconAlarmAdd from 'material-ui/svg-icons/action/alarm-add';

import { red500, green500, lightBlack } from 'material-ui/styles/colors';

export default class Shelf extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <List>
        <Subheader>Liste des produits</Subheader>
        {
          this.props.products.map((prd, i) => {
            const inStock = !!prd.stock;
            const primaryText = (<ProductLabel name={prd.name} portion={prd.portion_description} brand={prd.brand} />);
            const Price = (<ProductPrice price={prd.price} promotion={prd.promotion} />);
            const OutOfStock = (<ProductOutOfStock />);
            const category = (<ProductCategory category={prd.category} />);
            const secondaryText = (<p> { inStock ? Price : OutOfStock } <br /> {category} </p>);
            const addToCartBtn = (<IconButton><IconAddToShppingCart color={green500} /></IconButton>);
            const notifyMeBtn = (<IconButton><IconAlarmAdd /></IconButton>);
            const productImage = (<Avatar src={prd.picture} />);
            return (
              <div key={i}>
                <Divider inset={true} />
                <ListItem
                  primaryText={primaryText}
                  secondaryText={secondaryText}
                  secondaryTextLines={2}
                  leftAvatar={productImage}
                  rightIconButton={inStock ? addToCartBtn : notifyMeBtn }
                />
              </div>
            );
          })
        }
      </List>
    )
  }
}

Shelf.propTypes = {
  products: PropTypes.array.isRequired
}
