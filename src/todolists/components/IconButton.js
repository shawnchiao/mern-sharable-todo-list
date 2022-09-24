import React from "react";

import "./IconButton.css";

const IconButton = (props) => {
  return (
    <button
      className="btn"
      onClick={props.onClick}
      type="button"
      style={props.style}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      {props.children}
    </button>
  );
};

export default IconButton;
