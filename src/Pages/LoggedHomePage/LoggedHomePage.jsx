import {
  Box,
  Grid,
  Stack,
  ThemeProvider,
  createTheme,
  Button,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import Add from "../../Components/LoggedCPN/Add";
import FeedLogged from "../../Components/LoggedCPN/FeedLogged";
import LeftBarLogged from "../../Components/LoggedCPN/LeftBarLogged";
import Navbar from "../../Components/LoggedCPN/Navbar";
import RightBarLogged from "../../Components/LoggedCPN/RightBarLogged";
import SlugPage from "../SlugPage/SlugPage";

const LoggedHomePage = () => {
  const [mode, setMode] = useState("light");
  const darktheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          ...(mode === "dark"
            ? {
                background: {
                  paper: "#121212",
                },
              }
            : {}),
        },
      }),
    [mode]
  );

  return (
    <>
      <Box>
        <ThemeProvider theme={darktheme}>
          <Navbar />
          <Stack
            bgcolor={"background.default"}
            color={"text.primary"}
            direction="row"
            spacing={2}
            justifyContent="space-between"
          >
            <LeftBarLogged />
            <FeedLogged />
            <RightBarLogged />
          </Stack>
          <Add />
        </ThemeProvider>
      </Box>
    </>
  );
};

export default LoggedHomePage;
