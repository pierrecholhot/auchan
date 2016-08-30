import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import {addToCart, addCategoryFilter, removeCategoryFilter, addAllCategoryFilters, removeAllCategoryFilters} from '../actions';

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
import Snackbar from 'material-ui/Snackbar';

import { red500, green500, lightBlack } from 'material-ui/styles/colors';


class Shelf extends Component {

  constructor(props) {
    super(props)
    this.state = {
      filtersPopoverOpen: false,
      snackbarOpen: false,
      snackbarMessage: ""
    };
  }

  handleAddCart(id, name, price){
    return (e) => {
      this.props.dispatch(addToCart({id, name, price}));
      this.setState({
        snackbarOpen: true,
        snackbarMessage: `${name} ajouté au panier`
      })
    }
  }

  handleTouchTap(event) {
    event.preventDefault();
    this.setState({ filtersPopoverOpen: true, anchorEl: event.currentTarget });
  }

  handlePopoverRequestClose(){
    this.setState({ filtersPopoverOpen: false });
  }

  handleSnackbarRequestClose(){
    this.setState({ snackbarOpen: false });
  }

  triggerFilterActions(e, checked){
    const v = e.nativeEvent.target.nextSibling.textContent.split(' — ')[0];
    this.props.dispatch(
      checked ? addCategoryFilter(v) : removeCategoryFilter(v)
    )
  }

  componentDidMount(){
    this.props.dispatch(addAllCategoryFilters(Object.keys(this.props.filters.categories)))
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
        <Checkbox
          style={{padding:'8px 0'}}
          inputStyle={{top: 0}}
          label={`${c} — [${filters.categories[c]}]`}
          defaultChecked={this.props.categoryFilters.indexOf(c) >= 0}
          onCheck={this.triggerFilterActions.bind(this)}
        />
      </MenuItem>
    )

    return (
      <List>
        <Subheader style={{display: 'flex'}}>
          <span style={{flex: '1 0 0'}}>
            {!total ? "Aucun produit" : (total > 1 ? `${total} produits` : '1 produit')} dans votre rayon ( {this.props.district} > {this.props.aisle} > {this.props.name} )
          </span>
          <div style={{paddingRight: 8}}>
            <FlatButton
              label="Filtres"
              onTouchTap={this.handleTouchTap.bind(this)}
              secondary={true}
              icon={<FiltersIcon />}
            />
            <Popover
              open={this.state.filtersPopoverOpen}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              onRequestClose={this.handlePopoverRequestClose.bind(this)}
            >
              <Menu>{ categories }</Menu>
            </Popover>
          </div>
        </Subheader>
        { items }
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleSnackbarRequestClose.bind(this)}
        />
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

function mapStateToProps(state){
  const { categoryFilters, shelves, selectedShelf } = state;
  const filtered = shelves[selectedShelf].items.filter((p)=>{
    if(!p.category || p.category === 'null'){
      return true; // dont filter uncategorized
    }
    return (categoryFilters.indexOf(p.category) >= 0)
  });
  return {
    categoryFilters,
    products: filtered
  }
}

export default connect(mapStateToProps)(Shelf)
