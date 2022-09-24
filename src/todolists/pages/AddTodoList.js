import * as React from "react";
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
import CustomSwitch from '../../shared/components/FormElements/CustomSwitch';

const TypesOfTodoList = [
  { type: "Shopping", avatar: <ShoppingCartTwoToneIcon/> },
  { type: "Work", avatar: <WorkHistoryTwoToneIcon/> },
  { type: "Everyday", avatar: <ChairTwoToneIcon/> },
];

export default function SimpleDialog(props) {

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(TypesOfTodoList[1]);
  const [checked, setChecked ]=React.useState(true);
  const handleClose = (selectedValue) => {
    setOpen(false);
    setSelectedValue(selectedValue);
  };
  React.useEffect(() => {
    setOpen(true);
  }, []);

  const handleListItemClick = (value) => {
    handleClose(value);
  };
  const handleCheck = (c) => {
    setChecked(c);
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Pick Up A To-do List</DialogTitle>
      <List sx={{ pt: 0 }}>
        {TypesOfTodoList.map((each) => (
          <ListItem button onClick={() => handleListItemClick(each.type)} key={each.type}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blueGrey[50], color: blueGrey[700] }}>
                {each.avatar}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={each.type} />
          </ListItem>
        ))}
      </List>
      <CustomSwitch label="Allow other users to edit" checked={handleCheck}/>
    </Dialog>
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
