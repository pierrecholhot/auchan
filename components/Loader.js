import React, {PropTypes} from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

export const Loader = (props) => {
  const style = {
    container: {
      position: 'absolute',
      left: '50%',
      marginLeft: -20,
      top: 150
    },
    refresh: {
      display: 'inline-block',
      position: 'relative',
    },
  };
  return (
    <div style={style.container}>
      <RefreshIndicator size={40} left={10} top={0} status="loading" style={style.refresh} />
    </div>
  )
}
