import React, { Component, PropTypes } from 'react'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import i18n from '@ui/i18n'
import styles from './styles'

export const Navigation = ({ selected, handleShelfChange }) => {

  const handleTouchTap = (ev, item) => {
    handleShelfChange(item.props.value.toString())
  }

  return (
    <Menu onItemTouchTap={handleTouchTap} style={styles.root}>
      {
        Array.apply(null, {length: 25}).map(Number.call, Number).map((number, i) =>
          <MenuItem
            key={i}
            value={number}
            checked={number.toString() === selected}
            primaryText={`${i18n.shelf} #${number}`}
          />
        )
      }
    </Menu>
  )
}

Navigation.propTypes = {
  selected: PropTypes.string.isRequired,
  handleShelfChange: PropTypes.func.isRequired
}
