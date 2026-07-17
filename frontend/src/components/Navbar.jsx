import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const Search = styled("div", {
  shouldForwardProp: (prop) => prop !== "darkMode",
})(({ theme, darkMode }) => ({
  position: "relative",
  borderRadius: 10,
  backgroundColor: darkMode
    ? "#334155"
    : alpha(theme.palette.common.white, 0.15),

  "&:hover": {
    backgroundColor: darkMode
      ? "#475569"
      : alpha(theme.palette.common.white, 0.25),
  },

  marginRight: theme.spacing(2),
  marginLeft: 50,
  width: "100%",
  transition: "0.3s",

  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase, {
  shouldForwardProp: (prop) => prop !== "darkMode",
})(({ theme, darkMode }) => ({
  color: darkMode ? "#fff" : "#fff",

  "& .MuiInputBase-input": {
    color: darkMode ? "#fff" : "#fff",

    "&::placeholder": {
      color: darkMode ? "#cbd5e1" : "#ffffff",
      opacity: 1,
    },

    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",

    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar({
  darkMode,
  setDarkMode,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>

      <MenuItem>
        <IconButton color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

    return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          left: {
            xs: 0,
            sm: 250,
          },
          width: {
            xs: "100%",
            sm: "calc(100% - 250px)",
          },

          backgroundColor: darkMode ? "#1e293b" : "#1976d2",
          color: "#fff",
          transition: "all .3s ease",

          boxShadow: darkMode
            ? "0 10px 25px rgba(0,0,0,.35)"
            : "0 4px 15px rgba(0,0,0,.15)",
        }}
      >
        <Toolbar>

          <Search darkMode={darkMode}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase
              darkMode={darkMode}
              placeholder="Search..."
              inputProps={{
                "aria-label": "search",
              }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              alignItems: "center",
            }}
          >
            <IconButton
              color="inherit"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? (
                <LightModeIcon />
              ) : (
                <DarkModeIcon />
              )}
            </IconButton>

            <IconButton
              size="large"
              color="inherit"
            >
              <Badge
                badgeContent={4}
                color="error"
              >
                <MailIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              color="inherit"
            >
              <Badge
                badgeContent={17}
                color="error"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
            >
              <AccountCircle />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },
            }}
          >
            <IconButton
              size="large"
              color="inherit"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
            >
              <MoreIcon />
            </IconButton>
          </Box>

        </Toolbar>
      </AppBar>

      {renderMobileMenu}

      {renderMenu}
    </Box>
  );
}