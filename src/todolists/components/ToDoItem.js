import React from "react";
import { BsBookmark, BsBookmarkStarFill } from "react-icons/bs";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox
} from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

import audio from "./clickSound.wav";
import CheckBox from "./CheckBox";
import IconButton from "./IconButton";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import './todoItem.css';

function ToDoItem(props) {
  const [clicked, setClicked] = React.useState(false);

  function cross() {
    setClicked((prevValue) => {
      return !prevValue;
    });
  }

  function playSound() {
    const sound = new Audio(audio);
    sound.play();
  }

  // function space() {
  //   props.text.length;
  // }
//  console.log(props.id)
  return (
    <div className="todoItem">
      <CheckBox 
      onChange={(e)=> props.dispatch({type: "setTodo", payload: {index:props.id, isImportant: e.target.checked}})}
      >
        <BsBookmark size="20px" className="unchecked" />
        <BsBookmarkStarFill size="20px" className="checked" />
      </CheckBox>
      <CheckBox
        className="spaceItemContent"
        onClick={() => {
          !clicked && playSound();
          cross();
        }}
        onChange={(e)=> props.dispatch({type: "setTodo", payload: {index:props.id, isChecked: e.target.checked}})}
      >
        <MdOutlineCheckBoxOutlineBlank className="unchecked " />
        <CheckBoxRoundedIcon fontSize="medium" className="checked tick " />

        <li style={{ textDecoration: clicked ? "line-through" : "none" }}>
          {props.text}
        </li>
      </CheckBox>

      <IconButton
        onClick={() =>
          props.dispatch({ type: "deleteItem", payload: props.id })
        }
      >
        <AiFillDelete size="1.2rem" />
      </IconButton>

      <div style={{ clear: "both" }}></div>
    </div>
  );
}

export default ToDoItem;
