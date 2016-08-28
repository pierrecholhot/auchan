import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectShelf, fetchShelfIfNeeded } from '../actions'
import Picker from '../components/Picker'
import Shelf from '../components/Shelf'
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import {red500, deepPurple500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Menu from 'material-ui/svg-icons/navigation/menu';
import Close from 'material-ui/svg-icons/navigation/close';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Drawer from 'material-ui/Drawer';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
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
    e.preventDefault()
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
    const style = {
      container: {
        position: 'absolute',
        left: '50%',
        marginLeft: -20,
        top: 150
      },
      refresh: {
        display: 'inline-block',
        position: 'relative',
      },
    };
    const loading = (
      <div style={style.container}>
        <RefreshIndicator size={40} left={10} top={0} status="loading" style={style.refresh} />
      </div>
    )
    const showError = <h2 style={{textAlign: "center", color: red500}}>{error}</h2>
    return (
      <Paper style={{margin: "0 auto", minHeight: "50vh" }}>

        <AppBar
          title="AuchanDirect.fr"
          iconElementLeft={<IconButton onTouchTap={this.handleNavClick}><Menu /></IconButton>}
          iconElementRight={<IconButton onTouchTap={this.handleCartClick}><ShoppingCart /></IconButton>}
        />

        {
          isFetching ?
            loading :
            (error ? showError : <Shelf products={products} name={name} district={district} aisle={aisle} />)
        }

        <Drawer width={190} open={this.state.navOpen}>
          <AppBar style={{backgroundColor:deepPurple500}} title="Rayons" iconElementLeft={<IconButton onTouchTap={this.handleNavClick}><Close /></IconButton>} />
          <Picker value={selectedShelf} onChange={this.handleChange} />
        </Drawer>

        <Drawer width={320} openSecondary={true} open={this.state.cartOpen} docked={false}>
          <AppBar style={{backgroundColor:deepPurple500}} title="Panier" showMenuIconButton={false} iconElementRight={<IconButton onTouchTap={this.handleCartClick}><Close /></IconButton>} />
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
