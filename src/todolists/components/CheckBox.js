import React from "react";

import "./CheckBox.css";
const Checkbox = (props) => {
  return (
    <label className={`custom-checkbox ${props.className}`}>
      <input type="checkbox" onClick={props.onClick} onChange={props.onChange}/>
      {props.children}
    </label>
  );
};

export default Checkbox;
