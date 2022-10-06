import * as React from "react";

import List from "@mui/material/List";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function SimpleDialog(props) {
 
  return (
    <Dialog
      style={{ display: "flex", alignItems: "center" }}
      onClose={props.onClose}
      open={props.open}
      disableEnforceFocus="true"
      disableAutoFocus="true "
    >
      <DialogTitle>Set up</DialogTitle>
      <List sx={{ pt: 0 }}>
        <FormGroup sx={{ margin: "auto auto auto 1rem", width: "120px" }}>
          <FormControlLabel control={<Switch />} label="Public" />
          <FormControlLabel control={<Switch />} label="Editable" />
        </FormGroup>
      </List>
    </Dialog>
  );
}
