// Core
import React from 'react';

function Button(props) {
  return (
    <button className="button" onClick={props.onClick}>
      {props.text}
    </button>
  );
}

export default Button;
