import React, { Component, PropTypes } from 'react'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

export default class Picker extends Component {

  handleTouchTap(ev, item, itemIdx){
    this.props.onChange(item.props.value.toString());
  }

  render() {
    const { value, onChange } = this.props
    return (
      <Menu onItemTouchTap={this.handleTouchTap.bind(this)} style={{width: '180px'}}>{
          Array.apply(null, {length: 25}).map(Number.call, Number).map((option, i) =>
            <MenuItem
              key={i}
              value={option}
              checked={option.toString() === value}
              primaryText={`Rayon #${option}`}
            />
          )
      }</Menu>
    )
  }
}

Picker.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
