import React from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import WorkHistoryTwoToneIcon from "@mui/icons-material/WorkHistoryTwoTone";
import ChairTwoToneIcon from "@mui/icons-material/ChairTwoTone";
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import './TodoListItem.css';


const TodoListItem = props => {

  const handleImage = () => {
    switch (props.type) {
      case 'Shopping':
        return <ShoppingCartTwoToneIcon sx={{ fontSize: 53 }} color='success' />

      case 'Work':
        return <WorkHistoryTwoToneIcon sx={{ fontSize: 53 }} color='secondary' />

      case 'Everyday':
        return <ChairTwoToneIcon sx={{ fontSize: 53 }} color='inherit' />

      default:
        throw new Error;
    };
  };

  return (
    <>
      <li className={`${props.isShaking} user-item`}>
        {props.isShaking &&
          <RemoveCircleSharpIcon fontSize="large" color="info" style={{
            position: "relative",
            top: "19px",
            right: "18px"
          }} />
        }
        <Card className="user-item__content">
          <Link to={`/todoLists/${props.id}`}>
            <div className="user-item__image">
              {handleImage()}
              {/* {props.type === 'Work' && <WorkHistoryTwoToneIcon sx={{ fontSize: 53 }} color='action'/> ||
          props.type === 'Shopping' && <ShoppingCartTwoToneIcon/> } */}
              {/* <Avatar image={handleImage} alt={props.title} /> */}
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
    </>
  );
};

export default TodoListItem;
