import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Logo from "../../code_blogger_logo.png";
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArticleIcon from '@mui/icons-material/Article';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import {
  Container,
  AppBar,
  Toolbar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  ListItemButton,
} from "@mui/material";

import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Image = styled("img")({
  maxWidth: "20%",
  maxHeight: "50%",
});

const WithoutLoginButton = styled(Button)`
  background: #e9e9e9;
  text-transform: none;
  transition: background 1s, color 1s;
  &:hover {
    background: #000;
    color: #fff;
  }
`;

const drawerWidth = 200;

const NewHeader = ({setIsUserAuth, isUserAuth}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const account = useSelector((state) => state.account);

  const logoutHandle = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    setIsUserAuth(false);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigateLogin = () => {
    navigate("/login");
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    const child =
      name.split(" ").length > 1
        ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
        : `${name.charAt(0)}`;
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: child,
    };
  }

  const drawerItems = [
    {
      text: "Home",
      icon: <HomeIcon/>,
      to: "/", // <-- add link targets
    },
    {
      text: "About",
      icon: <InfoIcon/>,
      to: "/about",
    },
    {
      text: "Contact",
      icon: <ContactPageIcon/>,
      to: "/contact"
    },
    {
      text: "Your Blogs",
      icon: <ArticleIcon/>,
      to: "/user/posts"
    },
    {
      text: "Saved Blogs",
      icon: <BookmarkIcon/>,
      to: "/user/get-all-bookmarked-blogs"
    }
  ];



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ overflow: "hidden" , background: "#A459D1"}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              variant="temporary"
              sx={{
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              open={isDrawerOpen}
              onClose={toggleDrawer}
            >
              {/* {drawerItems} */}
              <List>
                {drawerItems.map((item) => {
                  const { text, icon, to } = item;
                  return (
                    <ListItemButton component={Link} to={to} key={text} onClick={toggleDrawer}>
                      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                      <ListItemText primary={text} style={{ color: "black" }} />
                    </ListItemButton>
                  );
                })}
              </List>
            </Drawer>
            <Box sx={{ flexGrow: 1 }}>
              <Image src={Logo} alt="Logo" />
            </Box>
            <Box>
              {sessionStorage.getItem("accessToken") && isUserAuth ? (
                <Box>
                  <IconButton
                    id="basic-button"
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <Avatar {...stringAvatar(account.name)} />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to="/profile"
                    >
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <Avatar />
                        </ListItemIcon>
                        Profile
                      </MenuItem>
                    </Link>

                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      onClick={logoutHandle}
                    >
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                      </MenuItem>
                    </Link>
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to="/login"
                      onClick={logoutHandle}
                    >
                      <MenuItem>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </Link>
                  </Menu>
                </Box>
              ) : (
                <WithoutLoginButton variant="text" onClick={navigateLogin}>
                  Login
                </WithoutLoginButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default NewHeader;
