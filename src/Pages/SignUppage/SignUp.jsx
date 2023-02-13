import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { httpClient } from "../../getApi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../../Redux/userSlice";
import { Twitter } from "@mui/icons-material";
const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    httpClient
      .post("users", {
        user: {
          username: userName,
          email: email,
          password: password,
        },
      })
      .then((res) => {
        sessionStorage.setItem("userToken", res.data.user.token);
        dispatch(updateUserData(res.data.user));
        navigate("/home");
      })
      .catch((err) => {
        alert("UserName or Email has already been taken");
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
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="User Name"
            autoFocus
            id="username"
            label="User Name"
            autoComplete="email"
            variant="filled"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            sx={{
              mt: 2,
            }}
          />
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
          <Button sx={{ mt: 3 }} variant="contained" fullWidth type="submit">
            Sign up
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
