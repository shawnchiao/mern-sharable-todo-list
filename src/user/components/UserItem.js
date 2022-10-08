import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import { AuthContext } from '../../shared/context/authContext';
import './UserItem.css';

const UserItem = props => {
  const auth = useContext(AuthContext);

  let count;
  let arrayOfLists;
  if (auth.userId !== props.id) {
    arrayOfLists = props.listInfoForTodo.filter(l => l.creator === props.id && l.setting.isPublic);
    count = arrayOfLists.length; 
  } else {
    count = props.todoListCount;
  }
  console.log(props.listInfoForTodo)
  console.log(count)
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/todoLists`}>
          <div className="user-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {count} {count === 1 ? 'List' : 'Lists'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
