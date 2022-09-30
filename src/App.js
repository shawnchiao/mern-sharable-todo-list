import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';

import Users from './user/pages/Users';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/authContext';
import { useAuth } from "./shared/hooks/authHook";
import UserTodoLists from './todolists/pages/UserTodoLists';
import TodoList from './todolists/pages/TodoList';
import AddTodoList from './todolists/pages/AddTodoList';

const App = () => {
  const { token, userId, login, logout } = useAuth();
 
  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/todolists" element={<UserTodoLists />} />
        <Route path="/todolist/new" element={<AddTodoList />} />
        <Route path="/todolists/:todolistId" element={<TodoList />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/todoLists" element={<UserTodoLists />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
