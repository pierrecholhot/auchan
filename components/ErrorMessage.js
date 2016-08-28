import React, {PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { red500 } from 'material-ui/styles/colors';

export const ErrorMessage = ({text}) => {
  return (
    <div style={{textAlign: "center"}}>
      <h2 style={{color: red500}}>{text}</h2>
    </div>
  );
}

ErrorMessage.propTypes = {
  text: PropTypes.string.isRequired
};
