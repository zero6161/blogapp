import React, { useState } from "react";
import {
  Box,
  styled,
  Grid,
  IconButton,
  Card,
  Typography,
  CardActions,
  CardContent,
  Button,
  Link,
  Modal,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import SignUp from "../../Pages/SignUppage/SignUp";
import { ModalLogin } from "../Modal";

const Rightbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpenLogin = () => {
    setOpen(true);
    navigate("login");
  };
  const handleCloseLogin = () => {
    setOpen(false);
    navigate("/");
  };
  const handleOpenSignUp = () => {
    setOpen(true);
    navigate("signup");
  };
  const handleCloseSignUp = () => {
    setOpen(false);
    navigate("/");
  };

  return (
    <>
      <Box>
        <Card
          variant="outlined"
          sx={{
            maxWidth: 345,
            borderRadius: "15px",
            padding: 1,
            m: 2,
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", paddingBottom: 1 }}
            >
              New to Twitter?
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Sign up now to get your own personalized timeline!
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              component="span"
              fullWidth={true}
              variant="contained"
              onClick={handleOpenLogin}
            >
              Log In
            </Button>
          </CardActions>
          <CardActions>
            <Button
              component="span"
              fullWidth={true}
              variant="contained"
              onClick={handleOpenSignUp}
            >
              Sign Up
            </Button>
          </CardActions>
          <CardContent>
            <Typography variant="body2">
              By signing up, you agree to the{" "}
              <Link underline="hover">Terms of Service</Link> and{" "}
              <Link underline="hover">Privacy Policy</Link>, including{" "}
              <Link underline="hover">Cookie Use.</Link>
            </Typography>
          </CardContent>
        </Card>
        <ModalLogin open={open} handleCloseLogin={handleCloseLogin} />
      </Box>
    </>
  );
};

export default Rightbar;
