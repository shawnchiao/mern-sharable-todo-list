import React, { useEffect, useState } from "react";

import useHttpClient from "../../shared/hooks/httpHook";
import UsersList from "../components/UsersList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const Users = () => {
  const { error, isLoading, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setloadedUsers] = useState();
  const [listInfoForTodo, setlistInfoForTodo] = useState();

  useEffect(() => {
    const obtainUserData = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );
        setloadedUsers(responseData.users);
        setlistInfoForTodo(responseData.listInfo);
        console.log(responseData)
      } catch (err) { }
    };
    obtainUserData();
  }, [sendRequest]);
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} listInfoForTodo={listInfoForTodo} />}

    </>
  )
};

export default Users;
