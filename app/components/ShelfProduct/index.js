import React, {PropTypes} from 'react'

import {
  ProductLabel,
  ProductPrice,
  ProductOutOfStock,
  ProductCategory
} from '@components'

import { ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import AddShoppingCartIcon from 'material-ui/svg-icons/action/add-shopping-cart'
import AlarmAddIcon from 'material-ui/svg-icons/action/alarm-add'
import IconButton from 'material-ui/IconButton'
import styles from './styles'
import guid from 'guid'

export const ShelfProduct = ({p, handleAddToCart}) => {

	const uid = () => guid.create()
  const inStock = !!p.stock
  const primaryText = <ProductLabel name={p.name} portion={p.portion_description} brand={p.brand} />
  const Price = <ProductPrice price={p.price} promotion={p.promotion} />
  const category = <ProductCategory category={p.category} />
  const secondaryText = <p> { (inStock && !!p.price) ? Price : <ProductOutOfStock /> } <br /> { p.category && category } </p>
  const btnAddToCart = <IconButton onTouchTap={handleAddToCart(p.id, p.name, p.price, uid().value)}><AddShoppingCartIcon color={styles.cartIconColor} /></IconButton>
  const btnNotify = <IconButton><AlarmAddIcon /></IconButton>
  const productImage = <Avatar src={p.picture} />

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
  p: PropTypes.object.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
}
