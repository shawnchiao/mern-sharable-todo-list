import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import WorkHistoryTwoToneIcon from "@mui/icons-material/WorkHistoryTwoTone";
import ChairTwoToneIcon from "@mui/icons-material/ChairTwoTone";
import RemoveCircleSharpIcon from "@mui/icons-material/RemoveCircleSharp";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Stack } from '@mui/material';

import { AuthContext } from "../../shared/context/authContext";
import useHttpClient from "../../shared/hooks/httpHook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Card from "../../shared/components/UIElements/Card";
import "./TodoListItem.css";

const TodoListItem = (props) => {
  const { error, isLoading, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [openWarning, setOpenWarning] = useState(false);

  const handleImage = () => {
    switch (props.type) {
      case "Shopping":
        return (
          <ShoppingCartTwoToneIcon sx={{ fontSize: 53 }} color="success" />
        );

      case "Work":
        return (
          <WorkHistoryTwoToneIcon sx={{ fontSize: 53 }} color="secondary" />
        );

      case "Everyday":
        return <ChairTwoToneIcon sx={{ fontSize: 53 }} color="inherit" />;

      default:
        throw new Error();
    }
  };
  
  const deleteHandler = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/todolists/${props.id}`,
        "DELETE",
        null,
        { Authorization: "Bearer " + auth.token }
      );
    } catch (err) {
      throw Error;
    }
    props.onDelete(props.id);
  };

 

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <Dialog
        open={openWarning}
        onClose={()=>setOpenWarning(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <WarningAmberIcon color="warning"sx={{ fontSize: 50 }} style={{margin:"30px auto 0px"}}/>
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete it?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Please note the deleted item cannot be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Stack direction="row" spacing={28}>
          <Button  sx={{ fontSize: 18 }} style={{color:"grey"}} onClick={()=>setOpenWarning(false)}>CANCEL</Button>
          <Button sx={{ fontSize: 18 }} color="error" onClick={deleteHandler} autoFocus>
            DELETE
          </Button>
          </Stack>
        </DialogActions>
      </Dialog>
      <li className={props.isDeleteMode ? "shaking todoListItem" : "user-item"}>
        {props.isDeleteMode && (
          <RemoveCircleSharpIcon
            fontSize="large"
            className="removeIcon"
            onClick={()=>setOpenWarning(true)}
          />
        )}
        <Card className="user-item__content">
          <Link to={props.isDeleteMode ? "" : `/todoLists/${props.id}`}>
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
