import React, {PropTypes} from 'react'

import Checkbox from 'material-ui/Checkbox'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import FiltersIcon from 'material-ui/svg-icons/content/filter-list'
import { COLOR_TERTIARY } from '@ui/colors'

export const ShelfFilters = ({
  filters,
  popoverState,
  categoryFilters,
  handleFilterToggle,
  handlePopoverTrigger,
  handlePopoverRequestClose,
}) => {

  const categories = Object.keys(filters.categories).map((c, i) =>
    <MenuItem key={i}>
      <Checkbox
        style={{padding:'8px 0'}}
        iconStyle={{fill: COLOR_TERTIARY}}
        inputStyle={{top: 0}}
        label={`${c} — [${filters.categories[c]}]`}
        defaultChecked={categoryFilters.indexOf(c) >= 0}
        onCheck={handleFilterToggle}
      />
    </MenuItem>
  )

  return (
    <div style={{paddingRight: 8}}>
      <FlatButton
        style={{color: COLOR_TERTIARY}}
        label="Filtres"
        onTouchTap={handlePopoverTrigger}
        icon={<FiltersIcon />}
      />
      <Popover
        open={popoverState.open}
        anchorEl={popoverState.anchorEl}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        onRequestClose={handlePopoverRequestClose}
      >
        <Menu>{ categories }</Menu>
      </Popover>
    </div>
  )
}

ShelfFilters.propTypes = {

}
