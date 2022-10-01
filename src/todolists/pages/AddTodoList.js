import React, { useReducer, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { blueGrey } from "@mui/material/colors";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import WorkHistoryTwoToneIcon from "@mui/icons-material/WorkHistoryTwoTone";
import ChairTwoToneIcon from "@mui/icons-material/ChairTwoTone";
import SendIcon from "@mui/icons-material/Send";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import CustomSwitch from "../../shared/components/FormElements/CustomSwitch";
import useHttpClient from "../../shared/hooks/httpHook";
import { AuthContext } from "../../shared/context/authContext";

const Types = [
  { type: "Shopping", avatar: <ShoppingCartTwoToneIcon /> },
  { type: "Work", avatar: <WorkHistoryTwoToneIcon /> },
  { type: "Everyday", avatar: <ChairTwoToneIcon /> },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "setTypeOfTodo":
      return { ...state, typeOfTodo: action.payload, title: action.payload };
    case "setIsPublic":
      return {
        ...state,
        setting: {
          isPublic: action.payload,
          isEditable: state.setting.isEditable,
        },
      };
    case "setIsEditable":
      return {
        ...state,
        setting: {
          isPublic: state.setting.isPublic,
          isEditable: action.payload,
        },
      };
    case "setTitle":
      return { ...state, title: action.payload };
    default:
      return state;
  }
};

export default function SimpleDialog(props) {
  const auth = useContext(AuthContext);
  const { error, isLoading, sendRequest, clearError } = useHttpClient();
  const [state, dispatch] = useReducer(reducer, {
    typeOfTodo: "",
    setting: { isPublic: false, isEditable: true },
    title: "",
  });
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleClose = (selectedValue) => {
    setOpen(false);
    navigate("/");
  };
  useEffect(() => {
    if (error) {
      setOpen(false);
    }
  }, [error]);

  const handleListItemClick = (value) => {
    dispatch({ type: "setTypeOfTodo", payload: value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/todolists`,
        "POST",
        JSON.stringify({
          title: state.title,
          type: state.typeOfTodo,
          isPublic: state.setting.isPublic,
          isEditable: state.setting.isEditable,
          creator: auth.userId,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(JSON.stringify(state));
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <Dialog onClose={handleClose} open={open} fullWidth="true">
        <form onSubmit={submitHandler}>
          <div className="typeChoices">
            <DialogTitle>Choose a to-do list</DialogTitle>
            <List sx={{ pt: 0 }}>
              {Types.map((each) => (
                <ListItem
                  button
                  onClick={() => handleListItemClick(each.type)}
                  key={each.type}
                  style={{
                    background: state.typeOfTodo === each.type && "#FD841F",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{ bgcolor: blueGrey[50], color: blueGrey[700] }}
                    >
                      {each.avatar}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={each.type} />
                </ListItem>
              ))}
            </List>
            <TextField
              style={{ top: "1rem" }}
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={state.title}
              onChange={(e) => {
                dispatch({ type: "setTitle", payload: e.target.value });
              }}
            />
          </div>
          <Stack direction="column" spacing={1.5}>
            <Divider />
            <CustomSwitch
              style={{ margin: "auto auto 10px" }}
              label={true ? "Allow other users to view" : "Only you can view "}
              onChange={(v) => dispatch({ type: "setIsPublic", payload: v })}
              checked={state.setting.isPublic}
            />
            <CustomSwitch
              style={{ margin: "auto auto 20px" }}
              label={true ? "Allow other users to edit" : "Only you can edit "}
              onChange={(v) => dispatch({ type: "setIsEditable", payload: v })}
              checked={state.setting.isEditable}
            />
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              style={{ width: "17em", margin: "auto" }}
              size="medium"
            >
              Confirm
            </Button>
            <Divider />
          </Stack>
        </form>
      </Dialog>
    </>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import ListItemText from '@mui/material/ListItemText';
// import ListItem from '@mui/material/ListItem';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import CloseIcon from '@mui/icons-material/Close';
// import Slide from '@mui/material/Slide';
// import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
// import WorkHistoryTwoToneIcon from "@mui/icons-material/WorkHistoryTwoTone";
// import ChairTwoToneIcon from "@mui/icons-material/ChairTwoTone";
// import Avatar from "@mui/material/Avatar";
// import ListItemAvatar from "@mui/material/ListItemAvatar";

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// export default function FullScreenDialog() {
//   const [open, setOpen] = React.useState(false);

//   // const handleClickOpen = () => {
//   //   setOpen(true);
//   // };

//   React.useEffect(()=>{setOpen(true)},[])

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       {/* <Button variant="outlined" onClick={handleClickOpen}>
//         Open full-screen dialog
//       </Button> */}
//       <Dialog
//         fullScreen
//         open={open}
//         onClose={handleClose}
//         TransitionComponent={Transition}
//       >
//         <AppBar sx={{ position: 'relative' }}>
//           <Toolbar>
//             <IconButton
//               edge="start"
//               color="inherit"
//               onClick={handleClose}
//               aria-label="close"
//             >
//               <CloseIcon />
//             </IconButton>
//             <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
//               Create a new to-do list
//             </Typography>
//             <Button autoFocus color="inherit" onClick={handleClose}>
//               save
//             </Button>
//           </Toolbar>
//         </AppBar>
//         <List>
//           <ListItem button>
//             <ListItemAvatar>
//               <Avatar>
//                 <ChairTwoToneIcon />
//               </Avatar>
//             </ListItemAvatar>
//             <ListItemText primary="Everyday"  />
//           </ListItem>

//           <ListItem button>
//           <ListItemAvatar>
//               <Avatar>
//                 <WorkHistoryTwoToneIcon />
//               </Avatar>
//             </ListItemAvatar>
//             <ListItemText primary="Work" />
//           </ListItem>
//           <ListItem button>
//           <ListItemAvatar>
//               <Avatar>
//                 <ShoppingCartTwoToneIcon />
//               </Avatar>
//             </ListItemAvatar>
//             <ListItemText primary="Shopping" />
//           </ListItem>
//         </List>
//         <Divider />

//       </Dialog>
//     </div>
//   );
// }
