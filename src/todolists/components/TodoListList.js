import React, { useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import TodoListItem from './TodoListItem';
import Button from '../../shared/components/FormElements/Button';
import { AuthContext } from '../../shared/context/authContext';

const TodoListList = props => {
  const auth = useContext(AuthContext);
  let { items, userId, isDeleteMode, onDelete, setIsDeleteMode } = props;

 


  if (auth.userId === userId && items.length === 0) {
    return (
      <div className="place-list center">
        <Card style={{ margin: "1.5vh" }}>
          <h2>No list found. Maybe create one?</h2>
          <Button to="/todoList/new">Create A List</Button>
        </Card>
      </div>
    );
  } 
  if (auth.userId !== userId) {
    items = items.filter((item) =>  item.setting.isPublic === true )
  }
  
 if (items.length === 0) {
    return (
      <div className="place-list center"  >
        <Card style={{ margin: "1.5vh" }}>
          <h2>No list shared by this user</h2>

        </Card>
      </div>
    )
  }

  return (
    <ul className="users-list" style={{ minHeight: '76vh', alignContent: "flex-start" }}>
      {items.map(todoList => (
        <TodoListItem
          key={todoList.id}
          id={todoList.id}
          title={todoList.title}
          creatorId={todoList.creator}
          type={todoList.type}
          isDeleteMode={isDeleteMode}
          onDelete={onDelete}
          setIsDeleteMode={setIsDeleteMode}
        />
      ))}

    </ul>
  );
};

export default TodoListList;
