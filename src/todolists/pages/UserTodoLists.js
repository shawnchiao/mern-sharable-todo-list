import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import useHttpClient from "../../shared/hooks/httpHook";
import TodoListList from "../components/TodoListList";
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const UserTodoLists = () => {
  const { error, isLoading, sendRequest, clearError } = useHttpClient();
  const [todoLists, setTodoLists] = useState([]);

  const userId = useParams().userId;

  useEffect(() => {
    const getData = async () => {
      let responseData;
      try {
         responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/todolists/user/${userId}`)
         setTodoLists(responseData.todoLists);
      } catch (err) { };
    };
    getData();

  }, [sendRequest, userId])

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />} 
      <TodoListList items={todoLists} />;
    </>
  )
};

export default UserTodoLists;
