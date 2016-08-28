import React, { Component, PropTypes } from 'react'
import MenuItem from 'material-ui/MenuItem';

export default class Picker extends Component {
  render() {
    const { value, onChange } = this.props
    return (
      <div>{
          Array.apply(null, {length: 25}).map(Number.call, Number).map((option, i) =>
            <MenuItem checked={option.toString() === value} key={i} primaryText={option} onTouchTap={(e) => onChange(e.target.innerText)} />
          )
      }</div>
    )
  }
}

Picker.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
