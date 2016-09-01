import React, {PropTypes} from 'react'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import styles from './styles'

export const Loader = () => {
  return (
    <div style={styles.root}>
      <RefreshIndicator
        size={40}
        left={10}
        top={0}
        status="loading"
        style={styles.spinner}
        loadingColor={styles.spinnerColor}
      />
    </div>
  )
}
