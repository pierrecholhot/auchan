import React, {PropTypes} from 'react'

import Checkbox from 'material-ui/Checkbox'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import FiltersIcon from 'material-ui/svg-icons/content/filter-list'

import i18n from '@ui/i18n'
import styles from './styles'

export const ShelfFilters = ({
  filters,
  popoverState,
  categoryFilters,
  handleFilterToggle,
  handlePopoverTrigger,
  handlePopoverRequestClose,
}) => {

  const categories = Object.keys(filters.categories)
    .map((c, i) =>
      <MenuItem key={i}>
        <Checkbox
          style={styles.checkbox}
          iconStyle={styles.checkboxSvgIcon}
          inputStyle={styles.checkboxInput}
          label={`${c} — [${filters.categories[c]}]`}
          defaultChecked={categoryFilters.indexOf(c) >= 0}
          onCheck={handleFilterToggle}
        />
      </MenuItem>
    )

  return categories.length ? (
    <div style={styles.categoriesWrapper}>
      <FlatButton
        style={styles.categoriesTrigger}
        label={i18n.filters}
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
  ) : null
}

ShelfFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  popoverState: PropTypes.object.isRequired,
  categoryFilters: PropTypes.array.isRequired,
  handleFilterToggle: PropTypes.func.isRequired,
  handlePopoverTrigger: PropTypes.func.isRequired,
  handlePopoverRequestClose: PropTypes.func.isRequired,
}
