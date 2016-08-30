import React, { Component, PropTypes } from 'react'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

export const Navigation = ({ selected, handleShelfChange }) => {

  const handleTouchTap = (ev, item) => {
    handleShelfChange(item.props.value.toString())
  };

  return (
    <Menu onItemTouchTap={handleTouchTap} style={{width: '180px'}}>{
        Array.apply(null, {length: 25}).map(Number.call, Number).map((number, i) =>
          <MenuItem
            key={i}
            value={number}
            checked={number.toString() === selected}
            primaryText={`Rayon #${number}`}
          />
        )
    }</Menu>
  )
}

Navigation.propTypes = {
  selected: PropTypes.string.isRequired,
  handleShelfChange: PropTypes.func.isRequired
}
