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

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { text: "Employees", icon: <GroupsIcon />, path: "/employee" },
  { text: "Departments", icon: <ApartmentIcon />, path: "/departments" },
  { text: "Profile", icon: <PersonIcon />, path: "/profile" },
  { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
];

export default function TemporaryDrawer({ darkMode }) {
  const [open, setOpen] = React.useState(false);

  const isMobile = useMediaQuery("(max-width:600px)");

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        bgcolor: darkMode ? "#1e293b" : "#fff",
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
            sx={{
              color: darkMode ? "#fff" : "#111827",

              "& .MuiListItemIcon-root": {
                color: darkMode ? "#60a5fa" : "#2563eb",
              },
            }}
          >
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>

            <ListItemText primary="HR PORTAL" />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider sx={{ borderColor: darkMode ? "#334155" : "#e5e7eb" }} />

      <List>
        {menuItems.map((item) => (
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
                  backgroundColor: darkMode ? "#334155" : "#eff6ff",
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

              bgcolor: darkMode ? "#334155" : "#ffffff",
              color: darkMode ? "#ffffff" : "#111827",

              boxShadow: 2,
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
            PaperProps={{
              sx: {
                width: 250,
                backgroundColor: darkMode ? "#1e293b" : "#fff",
                color: darkMode ? "#fff" : "#111827",
              },
            }}
          >
            {DrawerList}
          </Drawer>
        </>
      ) : (
        <Drawer
          variant="permanent"
          PaperProps={{
            sx: {
              width: 250,
              boxSizing: "border-box",

              backgroundColor: darkMode ? "#1e293b" : "#fff",

              borderRight: darkMode
                ? "1px solid #334155"
                : "1px solid #e5e7eb",

              color: darkMode ? "#fff" : "#111827",
            },
          }}
        >
          {DrawerList}
        </Drawer>
      )}
    </>
  );
}