import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  selectShelf, fetchShelfIfNeeded,
  openCart, closeCart, removeFromCart,
  openNav, closeNav,
  addAllCategoryFilters,
} from '../actions'

import {
  Loader,
  ErrorMessage,
  Navigation,
  ShoppingCart,
  ShoppingCartButton
} from '../components'

import Shelf from './Shelf'

import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import CloseIcon from 'material-ui/svg-icons/navigation/close'

import { COLOR_PRIMARY, COLOR_SECONDARY } from '../helpers/ui/colors'

class App extends Component {

  constructor(props) {
    super(props)
    _.bindAll(this, 'handleShelfChange', 'handleOpenNav', 'handleCloseNav', 'handleOpenCart', 'handleCloseCart', 'handleRemoveFromCart')
  }

  componentDidMount() {
    const { dispatch, selectedShelf } = this.props
    dispatch(fetchShelfIfNeeded(selectedShelf))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedShelf !== this.props.selectedShelf) {
      const { dispatch, selectedShelf } = nextProps
      dispatch(fetchShelfIfNeeded(selectedShelf))
      // if the shelf is cached, pre-select all filters
      if (nextProps.filters.categories) {
        dispatch(addAllCategoryFilters(Object.keys(nextProps.filters.categories)))
      }
    }
  }

  render() {
    const { selectedShelf, name, products, district, aisle, isFetching, error, filters, cart } = this.props

    // TODO: move to config.json
    const headerTitle = "AuchanDirect.fr"

    // TODO: postcss
    const paperStyles = { margin: "0 auto", minHeight: 300 }

    const HeaderLeftIcon = <IconButton onTouchTap={this.handleOpenNav}><MenuIcon /></IconButton>
    const HeaderRightIcon = <ShoppingCartButton handleOpenCart={this.handleOpenCart} total={cart.length} />
    const NavigationCloseButton = <IconButton onTouchTap={this.handleCloseNav}><CloseIcon /></IconButton>
    const ShoppingCartCloseButton = <IconButton onTouchTap={this.handleCloseCart}><CloseIcon /></IconButton>
    const DisplayLoader = <Loader />
    const DisplayErrorMessage = <ErrorMessage text={"Une erreur technique est survenue"} />
    const DisplayShelf = <Shelf products={products} name={name} district={district} aisle={aisle} filters={filters} />

    return (
      <Paper style={paperStyles}>

        <AppBar style={{backgroundColor: COLOR_PRIMARY}} title={headerTitle} iconElementLeft={HeaderLeftIcon} iconElementRight={HeaderRightIcon} />

        { isFetching ? DisplayLoader : (error ? DisplayErrorMessage : DisplayShelf) }

        <Drawer open={this.props.ui.navOpen} docked={false}>
          <AppBar title="Rayons" style={{ backgroundColor: COLOR_PRIMARY }} iconElementLeft={NavigationCloseButton} />
          <Navigation selected={selectedShelf} handleShelfChange={this.handleShelfChange} />
        </Drawer>

        <Drawer open={this.props.ui.cartOpen} width={340} openSecondary={true}>
          <AppBar title="Panier" style={{ backgroundColor: COLOR_SECONDARY }} showMenuIconButton={false} iconElementRight={ShoppingCartCloseButton} />
          <ShoppingCart items={cart} handleRemoveFromCart={this.handleRemoveFromCart} />
        </Drawer>

      </Paper>
    )
  }

  handleShelfChange(id) {
    const { dispatch } = this.props
    dispatch(selectShelf(id))
    dispatch(closeNav())
  }

  handleOpenCart() {
    this.props.dispatch(openCart())
  }

  handleCloseCart() {
    this.props.dispatch(closeCart())
  }

  handleRemoveFromCart(id){
    this.props.dispatch(removeFromCart(id))
  }

  handleOpenNav() {
    this.props.dispatch(openNav())
  }

  handleCloseNav() {
    this.props.dispatch(closeNav())
  }
}

App.propTypes = {
  selectedShelf: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  name: PropTypes.string,
  district: PropTypes.string,
  aisle: PropTypes.string,
  error: PropTypes.bool,
  filters: PropTypes.object,
  cart: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  const emptyShelf = { isFetching: true, items: [], filters: {}, name: "", district: "", aisle: "", error: false }
  const { selectedShelf, shelves, ui, cart } = state
  const { isFetching, name, district, aisle, error, filters, items: products } = shelves[selectedShelf] || emptyShelf
  return { selectedShelf, isFetching, error, name, aisle, district, products, filters, ui, cart }
}

export default connect(mapStateToProps)(App)
