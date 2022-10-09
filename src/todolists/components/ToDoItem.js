import React, { useContext } from "react";
import { BsBookmark, BsBookmarkStarFill } from "react-icons/bs";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

import audio from "./clickSound.wav";
import CheckBox from "./CheckBox";
import IconButton from "./IconButton";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import { AuthContext } from "../../shared/context/authContext";
import "./todoItem.css";

function ToDoItem(props) {
  const auth = useContext(AuthContext)
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
        disabled={!props.isEditMode && props.creator !== auth.userId}
        onChange={(e) =>
          props.dispatch({
            type: "setTodo",
            payload: { index: props.id, isImportant: e.target.checked },
          })
        }
        checked={props.isImportant}
      >
        <BsBookmark size="20px" className="unchecked" />
        <BsBookmarkStarFill size="20px" className="checked" />
      </CheckBox>
      <CheckBox
      disabled={!props.isEditMode && props.creator !== auth.userId}
        className="spaceItemContent"
        onClick={() => {
          !props.isChecked && playSound();

        }}
        onChange={(e) =>
          props.dispatch({
            type: "setTodo",
            payload: { index: props.id, isChecked: e.target.checked },
          })
        }
        checked={props.isChecked}
      >
        <MdOutlineCheckBoxOutlineBlank className="unchecked " />
        <CheckBoxRoundedIcon fontSize="medium" className="checked tick " />

        <li style={{ textDecoration: props.isChecked ? "line-through" : "none" }}>
          {props.text}
        </li>
      </CheckBox>
      {(props.isEditMode || props.creator === auth.userId) && (
        <IconButton
          onClick={() =>
            props.dispatch({ type: "deleteItem", payload: props.id })
          }
        >
          <AiFillDelete size="1.2rem" />
        </IconButton>
      )}

      <div style={{ clear: "both" }}></div>
    </div>
  );
}

export default ToDoItem;
