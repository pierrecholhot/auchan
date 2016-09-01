import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import {
  addToCart,
  addAllCategoryFilters,
  addCategoryFilter, removeCategoryFilter,
  openFiltersPopover, closeFiltersPopover,
  openSnackbar, closeSnackbar,
} from '@actions'

import {
  ShelfProduct,
  ShelfInfoBar,
  ShelfFilters,
} from '@components'

import { List } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Snackbar from 'material-ui/Snackbar'

import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import Checkbox from 'material-ui/Checkbox'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import FiltersIcon from 'material-ui/svg-icons/content/filter-list'

import i18n from '@ui/i18n'
import styles from './styles'

class Shelf extends Component {

  constructor(props) {
    super(props)
    _.bindAll(this,
      'handleAddToCart',
      'handleFilterToggle',
      'handlePopoverTrigger',
      'handlePopoverRequestClose',
      'handleSnackbarRequestClose',
    )
  }

  componentDidMount(){
    const arr = Object.keys(this.props.filters.categories)
    this.props.dispatch(addAllCategoryFilters(arr))
  }

  render() {
    const { products, district, aisle, name, filters, ui } = this.props
    const { filtersPopoverOpen, filtersPopoverAnchorEl } = ui

    return (
      <List>
        <Subheader style={styles.subheader}>
          <ShelfInfoBar
            totalProducts={products.length}
            breadcrumb={`${district} > ${aisle} > ${name}`}
          />
          <ShelfFilters
            filters={filters}
            popoverState={{ open: filtersPopoverOpen, anchorEl: filtersPopoverAnchorEl }}
            handlePopoverTrigger={this.handlePopoverTrigger}
            categoryFilters={this.props.categoryFilters}
            handlePopoverRequestClose={this.handlePopoverRequestClose}
            handleFilterToggle={this.handleFilterToggle}
          />
        </Subheader>
        {
          products.map((product, i) =>
            <ShelfProduct
              p={product}
              key={product.id}
              handleAddToCart={this.handleAddToCart}
            />
          )
        }
        <Snackbar
          autoHideDuration={4000}
          bodyStyle={styles.notification}
          open={this.props.ui.snackbarOpen}
          message={this.props.ui.snackbarMessage}
          onRequestClose={this.handleSnackbarRequestClose}
        />
      </List>
    )
  }

  handleAddToCart(id, name, price){
    const {dispatch} = this.props
    return (e) => {
      dispatch(addToCart({id, name, price}))
      dispatch(openSnackbar(`« ${name} » ${i18n.addedToCart}`))
    }
  }

  handlePopoverTrigger(e) {
    this.props.dispatch(openFiltersPopover(e.currentTarget))
  }

  handlePopoverRequestClose(){
    this.props.dispatch(closeFiltersPopover())
  }

  handleSnackbarRequestClose(){
    this.props.dispatch(closeSnackbar())
  }

  handleFilterToggle(e, checked){
    // TODO: find a cleaner way to store/parse the filter name
    const v = e.nativeEvent.target.nextSibling.textContent.split(' — ')[0]
    this.props.dispatch(checked ? addCategoryFilter(v) : removeCategoryFilter(v))
  }
}

Shelf.propTypes = {
  products: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  district: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  filters: PropTypes.object,
  categoryFilters: PropTypes.array
}

function mapStateToProps({ categoryFilters, shelves, selectedShelf, ui }){
  const filtered = shelves[selectedShelf].items.filter((p) => {
    // never hide those who don't have a category
    if (!p.category) { return true }
    return _.includes(categoryFilters, p.category)
  })
  return {
    ui,
    categoryFilters,
    products: filtered
  }
}

export default connect(mapStateToProps)(Shelf)
