import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { NavLink } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import BusinessIcon from "@mui/icons-material/Business";
import { useSelector } from "react-redux";

const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/",
    roles: ["Admin", "Manager", "Employee"],
  },
  {
    text: "Employees",
    icon: <GroupsIcon />,
    path: "/employee",
    roles: ["Admin", "Manager"],
  },
  {
    text: "Departments",
    icon: <ApartmentIcon />,
    path: "/departments",
    roles: ["Admin"],
  },
  {
    text: "Profile",
    icon: <PersonIcon />,
    path: "/profile",
    roles: ["Admin", "Manager", "Employee"],
  },
  {
    text: "Settings",
    icon: <SettingsIcon />,
    path: "/settings",
    roles: ["Admin"],
  },
];  

function TemporaryDrawer({ darkMode }) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  
 const role = useSelector(
    (state) => state.auth.user.role
  );

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        height: "100%",
      }}
      role="presentation"
      onClick={() => setOpen(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/"
          >
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="HR PORTAL" />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      <List>
  {menuItems
    .filter((item) => item.roles.includes(role))
    .map((item) => (
      <ListItem key={item.text} disablePadding>
        <ListItemButton
          component={NavLink}
          to={item.path}
          sx={{
            mx: 1.5,
            my: 0.5,
            borderRadius: 2,

            color: darkMode ? "#fff" : "#111827",

            "& .MuiListItemIcon-root": {
              color: darkMode ? "#fff" : "#111827",
              minWidth: 40,
            },

            "&.active": {
              backgroundColor: "#2563eb",
              color: "#fff",

              "& .MuiListItemIcon-root": {
                color: "#fff",
              },
            },

            "&:hover": {
              backgroundColor: darkMode
                ? "#334155"
                : "#eff6ff",
            },

            "&.active:hover": {
              backgroundColor: "#2563eb",
            },
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      </ListItem>
    ))}
</List>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <>
          <IconButton
            onClick={toggleDrawer}
            sx={{
              position: "fixed",
              top: 9,
              left: open ? 262 : 12,
              zIndex: (theme) => theme.zIndex.drawer + 1,
              borderRadius: 1,
              transition: "left .3s ease",
            }}
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            anchor="left"
            open={open}
            onClose={() => setOpen(false)}
            ModalProps={{
              keepMounted: true,
            }}
            slotProps={{
              paper: {
                sx: {
                  width: 250,
                },
              },
            }}
          >
            {DrawerList}
          </Drawer>
        </>
      ) : (
        <Drawer
          variant="permanent"
          slotProps={{
            paper: {
              sx: {
                width: 250,
              },
            },
          }}
        >
          {DrawerList}
        </Drawer>
      )}
    </>
  );
}

export default React.memo(TemporaryDrawer)
