import * as React from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import SaveIcon from "@mui/icons-material/Save";

import SettingsIcon from "@mui/icons-material/Settings";

const actions = [
  { icon: <SaveIcon />, name: "Save" },

  { icon: <SettingsIcon />, name: "Setting" }
];

export default function SpeedDialTooltipOpen() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClick = () => setOpen((p) => !p);

  return (
    // <Box sx={{ height: 200, transform: "translateZ(0px)", flexGrow: 1 }}>
    <div style={{display:"contents"}}>
      <Backdrop
        open={open}
        onClick={handleClose}
        invisible

      />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={[{ position: "sticky",marginLeft:"80vw", bottom:"1rem" }, {
          '& .MuiFab-primary': {
            backgroundColor: '#ffc107', color: '#3f51b5', '&:hover': {
              color: 'red',
              backgroundColor: '#ffebee',
            }
          }
        }]}
        icon={<SpeedDialIcon />}
        onClick={handleClick}
        onMouseEnter={handleOpen}
        open={open}

    

      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={handleClose}
           
          FabProps={{
            sx: {
            
              '&:hover': {
                bgcolor: '#ffebee',
              }
            }
          }}
          />
        ))}
      </SpeedDial>
      {/* </Box> */}
    </div>
  );
}
