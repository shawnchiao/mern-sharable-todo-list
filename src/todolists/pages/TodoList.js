import React, { useState, useReducer, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import SaveIcon from "@mui/icons-material/Save";
import Fab from "@mui/material/Fab";
import { GrPowerReset } from "react-icons/gr";

import ToDoItem from "../components/ToDoItem";
import IconButton from "../components/IconButton";
import useHttpClient from "../../shared/hooks/httpHook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import SpeedDial from "../components/SpeedDial";
import WarningDialog from "../components/WarningDialog";
import { AuthContext } from "../../shared/context/authContext";

import "./TodoList.css";

function TodoList() {
  const { error, isLoading, sendRequest, clearError } = useHttpClient();
  const [inputText, setInputText] = useState("");
  const [isEditMode, setIsEditMode] = useState();
  const auth = useContext(AuthContext);
  const [state, dispatch] = useReducer(
    reducer,
    [
      "",
      "",
      "",
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
      setIsEditMode(responseData.todoList.setting.isEditable)
      console.log(responseData);
    };
    getData();
  }, [sendRequest, todoListId]);

  function init(initArray) {
    return {
      title: initArray[0],
      type: initArray[1],
      creator: initArray[2],
      setting: initArray[3],
      todos: initArray[4],
    };
  }

  function reducer(state, action) {
    switch (action.type) {
      case "addItem":
        return {
          ...state,
          todos: [
            ...state.todos,
            {
              isImportant: false,
              isChecked: false,
              content: action.payload.inputText,
            },
          ],
        };
      case "deleteItem":
        return {
          ...state,
          todos: state.todos.filter((item, index) => {
            return index !== action.payload;
          }),
        };
      case "setTodo":
        const { index, ...otherPayload } = action.payload;
        //  remove the todo clicked from the state, so that it won't generate extra one
        const theRestTodos = state.todos.filter(
          (todo) => todo != state.todos[index]
        );
        // add the clicked todo to it with specified setting
        // an array of objects can't use spread operator like this
        // return  {...state, todos:[ ...state.todos, {...state.todos[index], ...otherPayload}]}
        // because there's no key for an object, so it would add new object in the array
        theRestTodos.splice(index, 0, {
          ...state.todos[index],
          ...otherPayload,
        });
        return { ...state, todos: [...theRestTodos] };

      case "setSetting":
        return { ...state, setting: { ...state.setting, ...action.payload } };

      case "setState":
        return {
          title: action.payload.title,
          type: action.payload.type,
          creator: action.payload.creator,
          setting: action.payload.setting,
          todos: action.payload.todos,
        };
      case "empty":
        setInputText("");
        return { ...state, todos: [] };
      default:
        return { ...state };
    }
  }

  const handleTitle = () => {
    let title = state.title;
    let titleArray = title.split(" ");
    if (title === "Everyday") {
      return "To-Do List";
    }
    if (
      titleArray[titleArray.length - 1] === "list" ||
      titleArray[titleArray.length - 1] === "List"
    ) {
      return title;
    }
    return `${title}  List`;
  };

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addItem(e) {
    e.preventDefault();
    dispatch({ type: "addItem", payload: { inputText: inputText } });
    setInputText("");
  }

  const handleSave = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/todoLists/${todoListId}`,
        "PATCH",
        JSON.stringify({
          todos: state.todos,
          setting: state.setting,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      console.log("saved!");
    } catch (err) {
      console.log(err);
    }
  };
 
  console.log(state);
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="container">
        <div className="todoList">
          <div
            className={`heading ${state.type === "Work" ? "workType" : ""}  ${
              state.type === "Shopping" ? "shoppingType" : ""
            }`}
          >
            <h1>{handleTitle()}</h1>
          </div>
          {(isEditMode || auth.userId === state.creator) && (
            <div className={`form ${state.type === "Work" ? "workType" : ""}`}>
            <form onSubmit={addItem}>
              <input onChange={handleChange} type="text" value={inputText} />
              <button type="submit">
                <span>Add</span>
              </button>
            </form>
          </div>
          )}
          
          <div>
            <ul>
              {state.todos.map((eachItem, index) => (
                <ToDoItem
                  key={index}
                  id={index}
                  text={eachItem.content}
                  dispatch={dispatch}
                  isImportant={eachItem.isImportant}
                  isChecked={eachItem.isChecked}
                  isEditMode={isEditMode}
                  creator={state.creator}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
      {(auth.userId === state.creator || state.setting.isEditable) && (
        <SpeedDial
          dispatch={dispatch}
          setting={state.setting}
          handleSave={handleSave}
          creator={state.creator}
        />
      )}
    </>
  );
}

export default TodoList;
