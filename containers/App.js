import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectShelf, fetchShelfIfNeeded } from '../actions'
import Picker from '../components/Picker'
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
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.handleCartClick = this.handleCartClick.bind(this)
    this.handleNavClick = this.handleNavClick.bind(this)
    this.state = {cartOpen: false, navOpen: false};
  }

  componentDidMount() {
    const { dispatch, selectedShelf } = this.props
    dispatch(fetchShelfIfNeeded(selectedShelf))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedShelf !== this.props.selectedShelf) {
      const { dispatch, selectedShelf } = nextProps
      dispatch(fetchShelfIfNeeded(selectedShelf))
    }
  }

  handleChange(nextID) {
    this.props.dispatch(selectShelf(nextID))
  }

  handleRefreshClick(e) {
    if(e){ e.preventDefault() }
    const { dispatch, selectedShelf } = this.props
    dispatch(fetchShelfIfNeeded(selectedShelf))
  }

  handleCartClick(e) {
    e.preventDefault()
    this.setState({cartOpen: !this.state.cartOpen});
  }

  handleNavClick(e) {
    e.preventDefault()
    this.setState({navOpen: !this.state.navOpen});
  }

  render() {
    const { selectedShelf, products, name, district, aisle, isFetching, error } = this.props;

    return (
      <Paper style={{margin: "0 auto", minHeight: "300px" }}>

        <AppBar
          title="AuchanDirect.fr"
          iconElementLeft={<IconButton onTouchTap={this.handleNavClick}><MenuIcon /></IconButton>}
          iconElementRight={<IconButton onTouchTap={this.handleCartClick}><ShoppingCartIcon /></IconButton>}
        />

        {
          isFetching ?
            <Loader /> :
            (error ? <ErrorMessage text={error} /> : <Shelf products={products} name={name} district={district} aisle={aisle} />)
        }

        <Drawer with={180} open={this.state.navOpen} docked={false}>
          <AppBar style={{backgroundColor:deepPurple500}} title="Rayons" iconElementLeft={<IconButton onTouchTap={this.handleNavClick}><CloseIcon /></IconButton>} />
          <Picker value={selectedShelf} onChange={this.handleChange} />
        </Drawer>

        <Drawer width={340} openSecondary={true} open={this.state.cartOpen}>
          <AppBar style={{backgroundColor:deepPurple500}} title="Panier" showMenuIconButton={false} iconElementRight={<IconButton onTouchTap={this.handleCartClick}><CloseIcon /></IconButton>} />
          <ShoppingCart items={['Un', 'Deux', 'Trois']} />
        </Drawer>

      </Paper>
    )
  }
}

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
