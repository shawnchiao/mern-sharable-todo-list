import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';


const TodoListItem = props => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/todoLists/${props.id}`}>
          <div className="user-item__image">
            <Avatar image={props.image} alt={props.title} />
          </div>
          <div className="user-item__info">
            <h2>{props.title}</h2>
            {/* <h3>
              {props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}
            </h3> */}
            {/* I want to show the number of todo item */}
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default TodoListItem;
