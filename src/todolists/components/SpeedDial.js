import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import WarningDialog from "./WarningDialog";
import { AuthContext } from "../../shared/context/authContext";

export default function SpeedDialTooltipOpen(props) {
  const auth = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const { setting, dispatch, handleSave } = props;

  // const handleOpen = () => setOpen(true);
  const handleCloseBackdrop = () => {
    setOpen(false);
    setSettingOpen(false);
  };
  // const handleClick = () => {
  //   setOpen((p) => !p);
  //   setSettingOpen(false);
  // };
  const handleClose = (event, reason) => {
    if (reason === "toggle") {
      setOpen(false);
      setSettingOpen(false);
    } else if (reason === "escapeKeyDown") {
      setOpen(false);
      setSettingOpen(false);
    } else if (reason === "mouseLeave") {
    } else if (reason === "blur") {
    }
  };

  const handleOpen = (event, reason) => {
    if (reason === "toggle") {
      setOpen(true);
      setSettingOpen(false);
    } else if (reason === "mouseEnter") {
      setOpen(true);
      setSettingOpen(false);
    } else if (reason === "focus") {
      setOpen(true);
      setSettingOpen(false);
    }
  };

  let actions = [
    {
      icon: <SaveIcon />,
      name: "Save",
      handleClick: () => {
        handleSave();
        setOpen(false);
      },
    },
    {
      icon: <RestartAltIcon />,
      name: "Empty",
      handleClick: () => {
        setOpenWarning(true);
        setOpen(false);
      },
    },

    {
      icon: <SettingsIcon />,
      name: "Setting",
      handleClick: (e) => {
        e.stopPropagation();

        setSettingOpen(true);
      },
    },
  ];

  if (auth.userId !== props.creator) {
    actions = [
      {
        icon: <SaveIcon />,
        name: "Save",
        handleClick: () => {
      
          handleSave();
        },
      },
      {
        icon: <RestartAltIcon />,
        name: "Empty",
        handleClick: () => {
  
          setOpenWarning(true);
        },
      },
    ];
  }

  return (
    <>
      <div>
        <Backdrop open={open} onClick={handleCloseBackdrop} />
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={[
            { position: "fixed", right: "3vw", bottom: "3vh" },
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
          // onClick={handleClick}
          // onMouseEnter={handleOpen}
          onOpen={handleOpen}
          onClose={handleClose}
          open={open}
          FabProps={{
            sx: {
              left: settingOpen && "40px",
            },
          }}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={action.handleClick}
              style={{
                left: settingOpen && "80px",
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
        <WarningDialog
          title="Are you sure you want to empty it?"
          description=""
          action="EMPTY"
          openWarning={openWarning}
          setOpenWarning={setOpenWarning}
          deleteHandler={() => {
            dispatch({ type: "empty" });
            setOpenWarning(false);
          }}
        />
      </div>
    </>
  );
}
