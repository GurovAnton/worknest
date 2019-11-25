// Core
import React from 'react';

function Header(props) {
  return (
    <div className="header-wrapper">
      <p>
        Select all images with <b>{`${props.topic}s`}</b>
      </p>
    </div>
  );
}

export default Header;
