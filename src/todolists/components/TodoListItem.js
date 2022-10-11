import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import WorkHistoryTwoToneIcon from "@mui/icons-material/WorkHistoryTwoTone";
import ChairTwoToneIcon from "@mui/icons-material/ChairTwoTone";
import RemoveCircleSharpIcon from "@mui/icons-material/RemoveCircleSharp";

import WarningDialog from "../components/WarningDialog";
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
    props.setIsDeleteMode(false);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <WarningDialog
        title="Are you sure you want to delete it?"
      
        action="DELETE"
        openWarning={openWarning}
        setOpenWarning={setOpenWarning}
        deleteHandler={deleteHandler}
      />
      <li className={props.isDeleteMode ? "shaking todoListItem" : "user-item"}>
        {props.isDeleteMode && (
          <RemoveCircleSharpIcon
            fontSize="large"
            className="removeIcon"
            onClick={() => setOpenWarning(true)}
          />
        )}
        <Card className="user-item__content">
          <Link to={props.isDeleteMode ? "" : `/todoLists/${props.id}`}>
            <div className="user-item__image">{handleImage()}</div>
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
