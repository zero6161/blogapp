import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { ModalLogin } from "../Modal";

export default function NavbarHome() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
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
    <Box
      display={{ xs: "block", sm: "block", md: "none" }}
      sx={{ flexGrow: 1 }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            WelCome
          </Typography>
          <Button color="inherit" onClick={handleOpenSignUp}>
            Sign up
          </Button>
          <Button color="inherit" onClick={handleOpenLogin}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <ModalLogin open={open} handleCloseLogin={handleCloseLogin} />
    </Box>
  );
}
