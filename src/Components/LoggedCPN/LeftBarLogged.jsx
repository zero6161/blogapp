import {
  Box,
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
import React, { useState } from "react";
import {
  ExitToApp,
  Settings,
  SettingsRounded,
  Tag,
  Twitter,
} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../../Redux/userSlice";

const LeftBarLogged = () => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    sessionStorage.removeItem("userToken", "password");
    dispatch(updateUserData(""));
  };
  const userData = useSelector((state) => state.user.user);
  return (
    <>
      <Box
        flex={1}
        bgcolor={"palette.action.active"}
        padding={2}
        sx={{
          display: { xs: "none", sm: "inline-block", md: "block" },
        }}
      >
        <Box position="fixed">
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
                  <ListItemText primary={"Setting"} />
                </ListItemButton>
              </ListItem>
            </List>
            <List>
              <ListItem>
                <ListItemButton onClick={handleLogOut} href={"/"}>
                  <ListItemIcon>
                    <ExitToApp />
                  </ListItemIcon>
                  <ListItemText primary={"Log out "} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LeftBarLogged;
