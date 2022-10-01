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
    <ul className="users-list">
      {props.items.map(todoList => (
        <TodoListItem
          key={todoList.id}
          id={todoList.id}
          // image={todoList.image}
          title={todoList.title}
          creatorId={todoList.creator}
          type={todoList.type}
        />
      ))}
    </ul>
  );
};

export default TodoListList;
