import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectShelf, fetchShelfIfNeeded, openNav, closeNav, openCart, closeCart, addAllCategoryFilters, removeFromCart } from '../actions'
import Navigation from '../components/Navigation'
import ShoppingCart from '../components/ShoppingCart'
import Shelf from '../components/Shelf'
import { Loader } from '../components/Loader'
import { ErrorMessage } from '../components/ErrorMessage'
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import {red500, deepPurple500, indigo500, white500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import ShoppingCartIcon from 'material-ui/svg-icons/action/shopping-cart';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleOpenNav = this.handleOpenNav.bind(this)
    this.handleCloseNav = this.handleCloseNav.bind(this)
    this.handleOpenCart = this.handleOpenCart.bind(this)
    this.handleCloseCart = this.handleCloseCart.bind(this)
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedShelf } = this.props
    dispatch(fetchShelfIfNeeded(selectedShelf))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedShelf !== this.props.selectedShelf) {
      const { dispatch, selectedShelf } = nextProps
      dispatch(fetchShelfIfNeeded(selectedShelf))
      // if the shelf is cached, select all filters
      if (nextProps.filters.categories) {
        dispatch(addAllCategoryFilters(Object.keys(nextProps.filters.categories)))
      }
    }
  }

  handleChange(nextID) {
    const { dispatch } = this.props
    dispatch(selectShelf(nextID))
    dispatch(closeNav())
  }

  handleOpenCart() {
    this.props.dispatch(openCart())
  }

  handleCloseCart() {
    this.props.dispatch(closeCart())
  }

  handleRemoveFromCart(ev, item, itemIdx){
    this.props.dispatch(removeFromCart(item.props.value));
  }

  handleOpenNav() {
    this.props.dispatch(openNav())
  }

  handleCloseNav() {
    this.props.dispatch(closeNav())
  }

  render() {
    const { selectedShelf, products, name, district, aisle, filters, isFetching, error, cart } = this.props;

    return (
      <Paper style={{margin: "0 auto", minHeight: "300px" }}>

        <AppBar
          title="AuchanDirect.fr"
          iconElementLeft={<IconButton onTouchTap={this.handleOpenNav}><MenuIcon /></IconButton>}
          iconElementRight={
            <Chip style={{margin: '8px 4px 0 0'}} onTouchTap={this.handleOpenCart} backgroundColor={white500}>
              <Avatar color={white500} backgroundColor={deepPurple500} icon={<ShoppingCartIcon />} />
              {cart.length}
            </Chip>
          }
        />

        {
          isFetching ?
            <Loader /> :
            (error ? <ErrorMessage text={error} /> : <Shelf products={products} name={name} district={district} aisle={aisle} filters={filters} />)
        }

        <Drawer with={180} open={this.props.ui.navOpen} docked={false}>
          <AppBar style={{backgroundColor:deepPurple500}} title="Rayons" iconElementLeft={<IconButton onTouchTap={this.handleCloseNav}><CloseIcon /></IconButton>} />
          <Navigation value={selectedShelf} onChange={this.handleChange} />
        </Drawer>

        <Drawer width={340} openSecondary={true} open={this.props.ui.cartOpen}>
          <AppBar style={{backgroundColor:deepPurple500}} title="Panier" showMenuIconButton={false} iconElementRight={<IconButton onTouchTap={this.handleCloseCart}><CloseIcon /></IconButton>} />
          <ShoppingCart items={cart} handleRemoveFromCart={this.handleRemoveFromCart} />
        </Drawer>

      </Paper>
    )
  }
}

App.propTypes = {
  selectedShelf: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { selectedShelf, shelves, ui, cart } = state

  const {
    isFetching,
    name,
    district,
    aisle,
    error,
    filters,
    items: products
  } = shelves[selectedShelf] || {
    isFetching: true,
    items: [],
    filters: [],
    name: "",
    district: "",
    aisle: "",
    error: false
  }

  return {
    selectedShelf,
    products,
    name,
    district,
    aisle,
    isFetching,
    filters,
    error,
    ui,
    cart
  }
}

export default connect(mapStateToProps)(App)
