import React, { Component, PropTypes } from 'react'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

export default class Navigation extends Component {

  handleTouchTap(ev, item, itemIdx){
    this.props.onChange(item.props.value.toString());
  }

  render() {
    const { value, onChange } = this.props
    return (
      <Menu onItemTouchTap={this.handleTouchTap.bind(this)} style={{width: '180px'}}>{
          Array.apply(null, {length: 25}).map(Number.call, Number).map((number, i) =>
            <MenuItem
              key={i}
              value={number}
              checked={number.toString() === value}
              primaryText={`Rayon #${number}`}
            />
          )
      }</Menu>
    )
  }
}

Navigation.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
