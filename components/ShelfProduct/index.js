import React, {PropTypes} from 'react';

import {
  ProductLabel,
  ProductPrice,
  ProductOutOfStock,
  ProductCategory
} from '../';

import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import AddShoppingCartIcon from 'material-ui/svg-icons/action/add-shopping-cart';
import AlarmAddIcon from 'material-ui/svg-icons/action/alarm-add';
import IconButton from 'material-ui/IconButton';
import { green500 } from 'material-ui/styles/colors';

export const ShelfProduct = ({prd, handleAddCart}) => {

  const inStock = !!prd.stock;
  const primaryText = (<ProductLabel name={prd.name} portion={prd.portion_description} brand={prd.brand} />);
  const Price = (<ProductPrice price={prd.price} promotion={prd.promotion} />);
  const category = (<ProductCategory category={prd.category} />);
  const secondaryText = (<p> { (inStock && !!prd.price) ? Price : <ProductOutOfStock /> } <br /> { prd.category && category } </p>);
  const btnAddToCart = (<IconButton onTouchTap={handleAddCart(prd.id, prd.name, prd.price)}><AddShoppingCartIcon color={green500} /></IconButton>);
  const btnNotify = (<IconButton><AlarmAddIcon /></IconButton>);
  const productImage = (<Avatar src={prd.picture} />);

  return (
    <div>
      <Divider inset={true} />
      <ListItem
        primaryText={primaryText}
        secondaryText={secondaryText}
        secondaryTextLines={2}
        leftAvatar={productImage}
        rightIconButton={inStock ? btnAddToCart : btnNotify}
      />
    </div>
  )
}

ShelfProduct.propTypes = {
  prd: PropTypes.object.isRequired,
  handleAddCart: PropTypes.func.isRequired,
};
