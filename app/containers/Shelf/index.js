import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import {
  addToCart,
  addCategoryFilter,
  removeCategoryFilter,
  addAllCategoryFilters,
  removeAllCategoryFilters
} from '@actions'

import {
  ShelfProduct,
  ShelfInfoBar,
} from '@components'

import { List } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Checkbox from 'material-ui/Checkbox'
import FlatButton from 'material-ui/FlatButton'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Snackbar from 'material-ui/Snackbar'
import FiltersIcon from 'material-ui/svg-icons/content/filter-list'

import { COLOR_TERTIARY } from '@ui/colors'

class Shelf extends Component {

  constructor(props) {
    super(props)
    _.bindAll(this, 'handleAddCart', 'handleTouchTap', 'handlePopoverRequestClose', 'handleSnackbarRequestClose', 'handleFilterToggle')

    // TODO: create a reducer
    this.state = {
      anchorEl: null,
      filtersPopoverOpen: false,
      snackbarOpen: false,
      snackbarMessage: ""
    }
  }

  componentDidMount(){
    const arr = Object.keys(this.props.filters.categories)
    this.props.dispatch(addAllCategoryFilters(arr))
  }

  render() {
    const { products, district, aisle, name, filters } = this.props
    const total = products.length
    const items = products.map((prd, i) => <ShelfProduct prd={prd} key={prd.id} handleAddCart={this.handleAddCart} />)
    const categories = Object.keys(filters.categories).map((c, i) =>
      <MenuItem key={i}>
        <Checkbox
          style={{padding:'8px 0'}}
          iconStyle={{fill: COLOR_TERTIARY}}
          inputStyle={{top: 0}}
          label={`${c} — [${filters.categories[c]}]`}
          defaultChecked={this.props.categoryFilters.indexOf(c) >= 0}
          onCheck={this.handleFilterToggle}
        />
      </MenuItem>
    )

    return (
      <List>
        <Subheader style={{display: 'flex'}}>
          <ShelfInfoBar totalProducts={total} breadcrumb={`${district} > ${aisle} > ${name}`} />
          <div style={{paddingRight: 8}}>
            <FlatButton
              style={{color: COLOR_TERTIARY}}
              label="Filtres"
              onTouchTap={this.handleTouchTap}
              icon={<FiltersIcon />}
            />
            <Popover
              open={this.state.filtersPopoverOpen}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              onRequestClose={this.handlePopoverRequestClose}
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
          onRequestClose={this.handleSnackbarRequestClose}
          bodyStyle={{backgroundColor: COLOR_TERTIARY}}
        />
      </List>
    )
  }


  handleAddCart(id, name, price){
    return (e) => {
      this.props.dispatch(addToCart({id, name, price}))
      this.setState({ snackbarOpen: true, snackbarMessage: `« ${name} » ajouté au panier` })
    }
  }

  handleTouchTap(e) {
    this.setState({ filtersPopoverOpen: true, anchorEl: e.currentTarget })
  }

  handlePopoverRequestClose(){
    this.setState({ filtersPopoverOpen: false })
  }

  handleSnackbarRequestClose(){
    this.setState({ snackbarOpen: false })
  }

  handleFilterToggle(e, checked){
    // TODO: find a cleaner way to store the filter name
    const v = e.nativeEvent.target.nextSibling.textContent.split(' — ')[0]
    this.props.dispatch(checked ? addCategoryFilter(v) : removeCategoryFilter(v))
  }
}

Shelf.propTypes = {
  products: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  district: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state){
  const { categoryFilters, shelves, selectedShelf } = state
  const filtered = shelves[selectedShelf].items.filter((p)=>{
    if(!p.category || p.category === 'null'){
      return true // dont filter uncategorized
    }
    return (categoryFilters.indexOf(p.category) >= 0)
  });
  return {
    categoryFilters,
    products: filtered
  }
}

export default connect(mapStateToProps)(Shelf)
