import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { httpClient } from "../../getApi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../../Redux/userSlice";
import { Twitter } from "@mui/icons-material";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitCheck = (event) => {
    event.preventDefault();
    httpClient
      .post("/users/login", {
        user: {
          email: email,
          password: password,
        },
      })
      .then((res) => {
        dispatch(updateUserData(res.data.user));
        sessionStorage.setItem("userToken", res.data.user.token);
        sessionStorage.setItem("password", res.data.user.password);
        navigate(`/home`);
      });
  };
  return (
    <>
      {" "}
      <Box display="flex" flexDirection="column" alignItems="center">
        <Twitter color="primary" fontSize="large" />
        <Typography variant="h6" mt={1}>
          Sign in to Twitter
        </Typography>
        <Box component="form" onSubmit={submitCheck}>
          <TextField
            fullWidth
            name="email"
            autoFocus
            id="email"
            label="Email"
            autoComplete="email"
            variant="filled"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              my: 2,
            }}
          />
          <TextField
            name="password"
            required
            type="password"
            value={password}
            fullWidth
            autoComplete="current-password"
            id="password"
            label="Mật khẩu của bạn"
            variant="filled"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button sx={{ mt: 2 }} variant="contained" fullWidth type="submit">
            Sign in
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
