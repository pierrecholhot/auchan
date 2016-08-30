import React, { Component, PropTypes } from 'react'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

export const Navigation = ({ value, handleShelfChange }) => {
  return (
    <Menu onItemTouchTap={handleShelfChange} style={{width: '180px'}}>{
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

Navigation.propTypes = {
  value: PropTypes.string.isRequired,
  handleShelfChange: PropTypes.func.isRequired
}
