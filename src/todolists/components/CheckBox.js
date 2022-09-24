import React from "react";

import "./CheckBox.css";
const Checkbox = (props) => {
  return (
    <label class={`custom-checkbox ${props.className}`}>
      <input type="checkbox" onClick={props.onClick} />
      {props.children}
    </label>
  );
};

export default Checkbox;
