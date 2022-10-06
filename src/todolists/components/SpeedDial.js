import * as React from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SettingsIcon from "@mui/icons-material/Settings";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import TodoSettingDialog from "./todoSettingDialog";
// const test = ()=> {
//   console.log('setting clciked');
//   <Backdrop
//         open={open}
//         onClick={handleClose}
//         invisible

//       />
// };

export default function SpeedDialTooltipOpen(props) {
  const [open, setOpen] = React.useState(false);
  const [settingOpen, setSettingOpen] = React.useState(false);
  const {setting, dispatch } = props;

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSettingOpen(false);
  };
  const handleClick = () => {
    setOpen((p) => !p);
    setSettingOpen(false);
  };

  const actions = [
    {
      icon: <SaveIcon />,
      name: "Save",
      handleClick: () => {
        console.log("save clicked");
      },
    },
    {
      icon: <RestartAltIcon />,
      name: "Empty",
      handleClick: () => {
        console.log("empty clicked");
        dispatch({type:"empty"})
      },
    },

    {
      icon: <SettingsIcon />,
      name: "Setting",
      handleClick: (e) => {
        e.stopPropagation();
        console.log("setting clicked");
        setSettingOpen(true);
      },
    },
  ];

  console.log(settingOpen);
  return (
    <>
      {/* // <Box sx={{ height: 200, transform: "translateZ(0px)", flexGrow: 1 }}> */}
      <div style={{ display: "contents" }}>
        <Backdrop open={open} onClick={handleClose} />
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={[
            { position: "sticky", marginLeft: "80vw", bottom: "1rem" },
            {
              "& .MuiFab-primary": {
                backgroundColor: "#ffc107",
                color: "#3f51b5",
                "&:hover": {
                  color: "red",
                  backgroundColor: "#ffebee",
                },
              },
            },
          ]}
          icon={<SpeedDialIcon />}
          onClick={handleClick}
          onMouseEnter={handleOpen}
          open={open}
        >
          {/* <TodoSettingDialog open={settingOpen} onClose={handleClose}/> */}
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={action.handleClick}
              style={{
                display:
                  settingOpen && action.name === "Setting" ? "none" : "inherit",
              }}
              FabProps={{
                sx: {
                  "&:hover": {
                    bgcolor: "#ffebee",
                  },
                },
              }}
            />
          ))}
          <Box
            sx={{
              height: 120,
              width: 130,
              transform: "translateZ(0px)",
              bgcolor: "#fff",
              position: "relative",
              right: "90px",
              bottom: "20px",
            }}
            style={{ display: !settingOpen ? "none" : "table" }}
          >
            <h4 style={{ paddingLeft: "1em" }}>Setting</h4>
            <FormGroup sx={{ margin: "auto auto auto 1rem", width: "120px" }}>
              <FormControlLabel
                onClick={(e) => e.stopPropagation()}
                control={<Switch />}
                label="Public"
                onChange={(e) =>
                  dispatch({
                    type: "setSetting",
                    payload: { isPublic: e.target.checked },
                  })
                }
                checked={setting.isPublic}
              />
              <FormControlLabel
                onClick={(e) => e.stopPropagation()}
                control={<Switch />}
                label="Editable"
                onChange={(e) =>
                  dispatch({
                    type: "setSetting",
                    payload: { isEditable: e.target.checked },
                  })
                }
                checked={setting.isEditable}
              />
            </FormGroup>
          </Box>
        </SpeedDial>
        {/* </Box> */}
      </div>
    </>
  );
}
