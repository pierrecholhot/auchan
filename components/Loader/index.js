import React, {PropTypes} from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import { COLOR_PRIMARY, COLOR_FG_SECONDARY } from '../../helpers/ui/colors';


export const Loader = () => {
  const style = {
    root: {
      position: 'absolute',
      left: '50%',
      marginLeft: -20,
      top: 150
    },
    spinner: {
      display: 'inline-block',
      position: 'relative',
    },
  };
  return (
    <div style={style.root}>
      <RefreshIndicator
        size={40}
        left={10}
        top={0}
        status="loading"
        style={style.spinner}
        loadingColor={COLOR_PRIMARY}
      />
    </div>
  )
}
