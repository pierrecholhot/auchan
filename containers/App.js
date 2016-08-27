import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectID, fetchShelfIfNeeded, invalidateID } from '../actions'
import Picker from '../components/Picker'
import Shelf from '../components/Shelf'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedID } = this.props
    dispatch(fetchShelfIfNeeded(selectedID))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedID !== this.props.selectedID) {
      const { dispatch, selectedID } = nextProps
      dispatch(fetchShelfIfNeeded(selectedID))
    }
  }

  handleChange(nextID) {
    this.props.dispatch(selectID(nextID))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedID } = this.props
    dispatch(invalidateID(selectedID))
    dispatch(fetchShelfIfNeeded(selectedID))
  }

  render() {
    const { selectedID, products, isFetching, lastUpdated } = this.props
    const isEmpty = products.length === 0
    return (
      <div>
        <Picker value={selectedID}
                onChange={this.handleChange}
                options={[ '23', '24' ]} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href="#"
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Shelf products={products} />
            </div>
        }
      </div>
    )
  }
}

App.propTypes = {
  selectedID: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedID, shelves } = state
  const {
    isFetching,
    lastUpdated,
    items: products
  } = shelves[selectedID] || {
    isFetching: true,
    items: []
  }

  return {
    selectedID,
    products,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
