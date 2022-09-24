import React from 'react';
import { useParams } from 'react-router-dom';

import TodoListList from '../components/TodoListList';

const DUMMY_TodoLists = [
  {
   id: "t1",
   title: "Shopping list",
   image: "https://cdn-icons-png.flaticon.com/512/263/263142.png",
   creator: "u1" 
  }
];

const UserTodoLists = () => {
  const userId = useParams().userId;
  const loadedTodoLists = DUMMY_TodoLists.filter(todoList => todoList.creator === userId);
  return <TodoListList items={loadedTodoLists} />;
};

export default UserTodoLists;
