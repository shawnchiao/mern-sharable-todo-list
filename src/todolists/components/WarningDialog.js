import * as React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default function WarningDialog(props) {
  const { openWarning, setOpenWarning, title, description, action, deleteHandler } = props


  const handleClose = (event, reason) => {
    if (reason === "backdropClick") { 
     
    } else {
      setOpenWarning(false);
    }
  };

  return (
    <Dialog
      open={openWarning}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <WarningAmberIcon
        color="warning"
        sx={{ fontSize: 50 }}
        style={{ margin: "30px auto 0px" }}
      />
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{justifyContent:"space-between"}}>
   
          <Button
            sx={{ fontSize: 18 }}
            style={{ color: "grey" }}
            onClick={() => setOpenWarning(false)}
          >
            CANCEL
          </Button>
          <Button
            sx={{ fontSize: 18 }}
            color="error"
            onClick={deleteHandler}
            autoFocus
          >
            {action}
          </Button>
     
      </DialogActions>
    </Dialog>
  );
}
