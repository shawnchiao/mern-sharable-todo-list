import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import useHttpClient from "../../shared/hooks/httpHook";
import TodoListList from "../components/TodoListList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/authContext";

const UserTodoLists = () => {
  const { error, isLoading, sendRequest, clearError } = useHttpClient();
  const [todoLists, setTodoLists] = useState([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);


  const userId = useParams().userId;

  const deleteHandler = (deletedtodoListId) => {
    setTodoLists((prev) =>
      prev.filter((todoList) => todoList.id !== deletedtodoListId)
    );
  };

  useEffect(() => {
    const getData = async () => {
      let responseData;
      try {
        responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/todolists/user/${userId}`
        );
        setTodoLists(responseData.todoLists);
        console.log('useefect')
      } catch (err) {}
    };
    getData();
  }, [sendRequest, userId]);
 console.log(todoLists);
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <TodoListList
        isDeleteMode={isDeleteMode}
        items={todoLists}
        onDelete={deleteHandler}
        setIsDeleteMode={setIsDeleteMode}
        userId={userId}
      />
      ;
      {todoLists.length !== 0 && (
        <Fab
          color="default"
          aria-label="edit"
          onClick={() => setIsDeleteMode((prev) => !prev)}
          style={{
            position: "fixed", marginLeft: "85%", bottom: "10%" 
          }}
        >
          {isDeleteMode ? <EditIcon /> : <DeleteIcon />}
        </Fab>
      )}
    </>
  );
};

export default UserTodoLists;
