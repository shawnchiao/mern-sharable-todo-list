import React, { useState, useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import SaveIcon from '@mui/icons-material/Save';
import Fab from "@mui/material/Fab";
import { GrPowerReset } from "react-icons/gr";

import ToDoItem from "../components/ToDoItem";
import IconButton from "../components/IconButton";
import useHttpClient from "../../shared/hooks/httpHook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import SpeedDial from "../components/SpeedDial";

import "./TodoList.css";

function TodoList() {
  const { error, isLoading, sendRequest, clearError } = useHttpClient();
  const [inputText, setInputText] = useState("");
  const [hover, setHover] = useState(false);
  const [state, dispatch] = useReducer(
    reducer,
    [
      { isPublic: false, isEditable: false },
      [{ isImportant: false, isChecked: false, content: "" }],
    ],
    init
  );

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
        return { ...state, todos: [...state.todos,{ isImportant:false, isChecked:false , content:action.payload.inputText} ] };
      case "deleteItem":
        return {
          ...state,
          todos: state.todos.filter((item, index) => {
            return index !== action.payload;
          }),
        };
      case "setTodo":
        const {index, ...otherPayload} = action.payload;
        //  remove the todo clicked from the state, so that it won't generate extra one
        const theRestTodos = state.todos.filter((todo) => todo != state.todos[index]);
        // add the clicked todo to it with specified setting
        // an array of objects can't use spread operator like this 
        // return  {...state, todos:[ ...state.todos, {...state.todos[index], ...otherPayload}]}  
        // because there's no key for an object, so it would add new object in the array
        theRestTodos.splice(index, 0, {...state.todos[index], ...otherPayload});
        return  {...state, todos:[  ...theRestTodos ]}   
         
      case "setSetting":
        return { ...state, setting: { ...state.setting, ...action.payload } };

      case "setState":
        return { setting: action.payload.setting, todos: action.payload.todos };
      case "empty":
        return {...state, todos:[]};
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
    <>
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
                text={eachItem.content}
                dispatch={dispatch}
              />
            ))}
          </ul>
        </div>
      </div>
     
    </div>
    <SpeedDial dispatch={dispatch} setting={state.setting}/>

        </>
  );
}

export default TodoList;
