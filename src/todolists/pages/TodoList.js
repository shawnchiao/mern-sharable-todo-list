import React, { useState, useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { GrPowerReset } from "react-icons/gr";

import ToDoItem from "../components/ToDoItem";
import IconButton from "../components/IconButton";
import useHttpClient from "../../shared/hooks/httpHook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import "./TodoList.css";

function TodoList() {
  const { error, isLoading, sendRequest, clearError } = useHttpClient();
  const [inputText, setInputText] = useState("");
  const [hover, setHover] = useState(false);
  const [state, dispatch] = useReducer(reducer, [{isPublic:false, isEditable:false}, []], init);

  const todoListId = useParams().todolistId;

  useEffect(() => {
    const getData = async () => {
      let responseData;
      try {
        responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/todolists/${todoListId}`
        );
      } catch (err) {}
      dispatch({ type: "setState", payload: responseData.todoList });
    };
    getData();
  }, [sendRequest, todoListId]);

  function init(initArray) {
    return { setting: initArray[0], todos: initArray[1] };
  }

  function reducer(state, action) {
    switch (action.type) {
      case "addItem":
        return { ...state, todos: [...state.todos, action.payload.inputText] };
      case "deleteItem":
        return {
          ...state,
          todos: state.todos.filter((item, index) => {
            return index !== action.payload;
          }),
        };
      case "setSetting":
       return { ...state, setting: {...state.setting, ...action.payload}}

      case "setState":
        return { setting: action.payload.setting, todos: action.payload.todos };
      case "reset":
        return init([]);
      default:
        return { ...state };
    }
  }

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addItem(e) {
    e.preventDefault();
    dispatch({ type: "addItem", payload: { inputText: inputText } });
    setInputText("");
  }

  console.log(state);
  return (
    <div className="container">
      <div className="todoList">
        <div className="heading">
          <IconButton
            onClick={() => dispatch({ type: "reset" })}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ backgroundColor: hover && "#F24C4C" }}
          >
            <GrPowerReset />
          </IconButton>
          <h1>To-Do List</h1>
        </div>
        <div className="form">
          <form onSubmit={addItem}>
            <input onChange={handleChange} type="text" value={inputText} />
            <button type="submit">
              <span>Add</span>
            </button>
          </form>
        </div>
        <div>
          <ul>
            {state.todos.map((eachItem, index) => (
              <ToDoItem
                key={index}
                id={index}
                text={eachItem}
                dispatch={dispatch}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="control">
        <FormControlLabel
          control={
            <Switch
              onChange={(e) =>
                dispatch({
                  type: "setSetting",
                  payload: { isPublic: e.target.checked},
                })
              }
              checked={state.setting.isPublic}
            />
          }
          label="Public"
        />
        <FormControlLabel
          control={
            <Switch
              onChange={(e) =>
                dispatch({
                  type: "setSetting",
                  payload: { isEditable: e.target.checked},
                })
              }
              checked={state.setting.isEditable}
            />
          }
          label="Editable"
        />
        <Button className="test" variant="text">
          Save
        </Button>
      </div>
    </div>
  );
}

export default TodoList;
