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
import Checkbox from 'material-ui/Checkbox';

import AddShoppingCartIcon from 'material-ui/svg-icons/action/add-shopping-cart';
import AlarmAddIcon from 'material-ui/svg-icons/action/alarm-add';
import FiltersIcon from 'material-ui/svg-icons/content/filter-list';

import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import { red500, green500, lightBlack } from 'material-ui/styles/colors';


class Shelf extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false
    };
  }

  handleAddCart(id, name, price){
    return (e) => {
      this.props.dispatch(addToCart({id, name, price}));
    }
  }

  handleTouchTap(event) {
    event.preventDefault();
    this.setState({ open: true, anchorEl: event.currentTarget });
  }

  handleRequestClose(){
    this.setState({ open: false });
  }

  render() {
    const { products, filters } = this.props;
    const total = products.length;
    const items = products.map((prd, i) => {
      const inStock = !!prd.stock;
      const primaryText = (<ProductLabel name={prd.name} portion={prd.portion_description} brand={prd.brand} />);
      const Price = (<ProductPrice price={prd.price} promotion={prd.promotion} />);
      const category = (<ProductCategory category={prd.category} />);
      const secondaryText = (<p> { (inStock && !!prd.price) ? Price : <ProductOutOfStock /> } <br /> { prd.category && category } </p>);
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
      )
    });

    const categories = Object.keys(filters.categories).map((c, i) =>
      <MenuItem key={i}>
        <Checkbox style={{padding:'8px 0'}} inputStyle={{top: 0}} label={`${c} (${filters.categories[c]})`} defaultChecked={true} />
      </MenuItem>
    )

    return (
      <List>
        <Subheader style={{display: 'flex'}}>
          <span>
            {!total ? "Aucun produit" : (total > 1 ? `${total} produits` : '1 produit')} dans votre rayon ( {this.props.district} > {this.props.aisle} > {this.props.name} )
          </span>
          <div style={{flex: '1 0 0', textAlign: 'right', paddingRight: 8}}>
            <FlatButton label="Filtres" onTouchTap={this.handleTouchTap.bind(this)} secondary={true} icon={<FiltersIcon />} />
            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              onRequestClose={this.handleRequestClose.bind(this)}
            >
              <Menu>{ categories }</Menu>
            </Popover>
          </div>
        </Subheader>
        { items }
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
