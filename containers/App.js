import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectShelf, fetchShelfIfNeeded, openNav, closeNav, openCart, closeCart } from '../actions'
import Navigation from '../components/Navigation'
import ShoppingCart from '../components/ShoppingCart'
import Shelf from '../components/Shelf'
import { Loader } from '../components/Loader'
import { ErrorMessage } from '../components/ErrorMessage'
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import {red500, deepPurple500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import ShoppingCartIcon from 'material-ui/svg-icons/action/shopping-cart';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleOpenNav = this.handleOpenNav.bind(this)
    this.handleCloseNav = this.handleCloseNav.bind(this)
    this.handleOpenCart = this.handleOpenCart.bind(this)
    this.handleCloseCart = this.handleCloseCart.bind(this)
    this.state = {cartOpen: false, navOpen: false};
  }

  componentDidMount() {
    const { store, dispatch, selectedShelf } = this.props
    dispatch(fetchShelfIfNeeded(selectedShelf))
    store.subscribe(() => {
      this.setState(this.props.store.getState().ui);
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedShelf !== this.props.selectedShelf) {
      const { dispatch, selectedShelf } = nextProps
      dispatch(fetchShelfIfNeeded(selectedShelf))
    }
  }

  handleChange(nextID) {
    this.props.dispatch(selectShelf(nextID))
    this.props.dispatch(closeNav())
  }

  handleOpenCart() {
    this.props.dispatch(openCart())
  }

  handleCloseCart() {
    this.props.dispatch(closeCart())
  }

  handleOpenNav() {
    this.props.dispatch(openNav())
  }

  handleCloseNav() {
    this.props.dispatch(closeNav())
  }

  render() {
    const { selectedShelf, products, name, district, aisle, isFetching, error, store } = this.props;

    return (
      <Paper style={{margin: "0 auto", minHeight: "300px" }}>

        <AppBar
          title="AuchanDirect.fr"
          iconElementLeft={<IconButton onTouchTap={this.handleOpenNav}><MenuIcon /></IconButton>}
          iconElementRight={<IconButton onTouchTap={this.handleOpenCart}><ShoppingCartIcon /></IconButton>}
        />

        {
          isFetching ?
            <Loader /> :
            (error ? <ErrorMessage text={error} /> : <Shelf products={products} name={name} district={district} aisle={aisle} />)
        }

        <Drawer with={180} open={this.state.navOpen} docked={false}>
          <AppBar style={{backgroundColor:deepPurple500}} title="Rayons" iconElementLeft={<IconButton onTouchTap={this.handleCloseNav}><CloseIcon /></IconButton>} />
          <Navigation value={selectedShelf} onChange={this.handleChange} />
        </Drawer>

        <Drawer width={340} openSecondary={true} open={this.state.cartOpen}>
          <AppBar style={{backgroundColor:deepPurple500}} title="Panier" showMenuIconButton={false} iconElementRight={<IconButton onTouchTap={this.handleCloseCart}><CloseIcon /></IconButton>} />
          <ShoppingCart store={store} />
        </Drawer>

      </Paper>
    )
  }
}


App.childContextTypes = {
    store: PropTypes.object.isRequired
};

App.propTypes = {
  selectedShelf: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedShelf, shelves } = state
  const {
    isFetching,
    name,
    district,
    aisle,
    error,
    items: products
  } = shelves[selectedShelf] || {
    isFetching: true,
    items: [],
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
    error,
  }
}

export default connect(mapStateToProps)(App)
