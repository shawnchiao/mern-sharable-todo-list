import React, { useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import TodoListItem from './TodoListItem';
import Button from '../../shared/components/FormElements/Button';
import { AuthContext } from '../../shared/context/authContext';

const TodoListList = props => {
  const auth = useContext(AuthContext);
  
  if (props.items.length === 0 && auth.userId === props.userId ) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No to-do list found. Maybe create one?</h2>
          <Button to="/todoList/new">Share to-do list</Button>
        </Card>
      </div>
    );
  } else if (props.items.length === 0 && auth.userId !== props.userId ) {
    return (
      <div className="place-list center"  >
        <Card>
          <h2>No list created by this user</h2>

        </Card>
      </div>
    )
  }

  return (
    <ul className="users-list" style={{ minHeight: '76vh', alignContent: "flex-start" }}>
      {props.items.map(todoList => (
        <TodoListItem
          key={todoList.id}
          id={todoList.id}
          title={todoList.title}
          creatorId={todoList.creator}
          type={todoList.type}
          isDeleteMode={props.isDeleteMode}
          onDelete={props.onDelete}
          setIsDeleteMode={props.setIsDeleteMode}
        />
      ))}

    </ul>
  );
};

export default TodoListList;
