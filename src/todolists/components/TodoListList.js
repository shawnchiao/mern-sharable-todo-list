import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import TodoListItem from './TodoListItem';
import Button from '../../shared/components/FormElements/Button';


const TodoListList = props => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No To-Do list found. Maybe create one?</h2>
          <Button to="/todoList/new">Share To-Do list</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list" style={{minHeight:'76vh', alignContent:"flex-start"}}>
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
