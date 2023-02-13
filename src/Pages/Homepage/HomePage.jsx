import {
  Grid,
  styled,
  Box,
  Typography,
  BottomNavigation,
  Button,
} from "@mui/material";
import React from "react";
import Feed from "../../Components/HomeCPN/Feed";
import Leftbar from "../../Components/HomeCPN/LeftBar";
import NavbarHome from "../../Components/HomeCPN/NavbarHome";
import Rightbar from "../../Components/HomeCPN/Rightbar";
import { blue } from "@mui/material/colors";

const color = blue[200];

const Botbar = styled(Box)({
  position: "fixed",
  bottom: "0",
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  backgroundColor: "blue",
  color: "primary",
  height: "75px",
});
const HomePage = () => {
  return (
    <>
      <NavbarHome />
      <Grid container>
        <Grid item md={3}>
          <Box
            display={{ xs: "none", md: "flex" }}
            justifyContent="flex-end"
            flexDirection="column"
            alignItems="flex-end"
          >
            <Leftbar />
          </Box>
        </Grid>
        <Grid
          item
          md={6}
          sm={12}
          sx={{
            px: 3,
          }}
        >
          <Feed />
        </Grid>
        <Grid item md={3}>
          <Box display={{ xs: "none", sm: "none", md: "block" }}>
            <Rightbar />
          </Box>
        </Grid>
      </Grid>
      <Botbar display={{ md: "flex", sm: "none", xs: "none" }}>
        <Box>
          <Typography variant="h4" color="white">
            Don’t miss what’s happening
          </Typography>
          <Typography variant="body1" color="white">
            People on Twitter are the first to know.
          </Typography>
        </Box>
        <Box alignItems="center">
          <Button
            sx={{
              borderRadius: 4,
              mr: 2,
            }}
            variant="contained"
          >
            Log in
          </Button>
          <Button
            sx={{
              borderRadius: 4,
            }}
            variant="contained"
          >
            Sign up
          </Button>
        </Box>
      </Botbar>
    </>
  );
};

export default HomePage;
