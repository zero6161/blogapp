import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Drawer,
  styled,
  Grid,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import {
  ExitToApp,
  Settings,
  SettingsRounded,
  Tag,
  Twitter,
} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleLogOut = () => {
    sessionStorage.removeItem("userToken", "password");
  };
  const userData = useSelector((state) => state.user.user);

  return (
    <Box display={{ md: "none", sm: "block" }} sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => setIsDrawerOpen(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <IconButton size="large">
            <Twitter
              sx={{
                color: "white",
              }}
            />
          </IconButton>
        </Toolbar>
        <Drawer
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          anchor="left"
        >
          <Box>
            <List>
              <ListItem>
                <ListItemButton href="/home">
                  <ListItemIcon>
                    <Twitter fontSize="large" />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
            </List>
            <List>
              <ListItem>
                <ListItemButton href={`/${userData.username}`}>
                  <ListItemIcon>
                    <AccountCircleIcon fontSize="large" />
                  </ListItemIcon>
                  <ListItemText primary={userData.username} />
                </ListItemButton>
              </ListItem>
            </List>
            <List>
              <ListItem>
                <ListItemButton href={"/setting"}>
                  <ListItemIcon>
                    <Settings fontSize="large" />
                  </ListItemIcon>
                  <ListItemText primary={"Cài Đặt"} />
                </ListItemButton>
              </ListItem>
            </List>
            <List>
              <ListItem>
                <ListItemButton onClick={handleLogOut} href={"/"}>
                  <ListItemIcon>
                    <ExitToApp />
                  </ListItemIcon>
                  <ListItemText primary={"Đăng Xuất"} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </AppBar>
    </Box>
  );
}
