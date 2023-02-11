import {
  Avatar,
  Box,
  Button,
  Input,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bgImg from "../../Components/image/background.jpg";
import { httpClient } from "../../getApi";
import { updateUserData } from "../../Redux/userSlice";
const Background = styled(Box)({
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${bgImg})`,
  height: "100vh",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
const Container = styled(Paper)({
  width: { md: "50vw", sm: "100vw" },

  height: "100vh",
});

const SettingUser = () => {
  const userData = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [email, setEmail] = useState(userData.email);
  const [userName, setUserName] = useState(userData.username);
  const [image, setImage] = useState(userData.image);
  const [bio, setBio] = useState(userData.bio);
  const [password, setPassword] = useState(userData.password);
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");
  const hanleSubmit = (e) => {
    e.preventDefault();
    httpClient
      .put("user", {
        user: {
          email: email,
          password: password,
          username: userName,
          bio: bio,
          image: image,
        },
      })
      .then((res) => {
        dispath(updateUserData(res.data.user));
        navigate(`/home`);
      })
      .catch((err) => setError("Try Again"));
  };

  const handleImg = (e) => {
    const file = e.target.files[0];

    file.preview = URL.createObjectURL(file);

    setAvatar(file);
    setImage(file.preview);
  };
  return (
    <Background>
      <Container elevation={12}>
        <Typography marginTop="20px" textAlign="center" variant="h6">
          Chỉnh Sửa Hồ Sơ
        </Typography>
        <Box
          component="form"
          onSubmit={hanleSubmit}
          sx={{
            p: 5,
            mx: "30px",
            my: "15px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
          }}
        >
          {/* <Box display="flex">
            <Avatar sx={{ margin: 1 }} src={userData.image} />
            <Input disableUnderline type="file" />
          </Box> */}
          <TextField
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            fullWidth
            label="Tên Tài Khoản"
            variant="outlined"
          />
          <TextField
            value={bio || ""}
            fullWidth
            onChange={(e) => setBio(e.target.value)}
            label="Giới Thiệu"
            variant="outlined"
          />
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            label="Email"
            autoComplete="username"
            type="email"
            variant="outlined"
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            autoComplete="current-password"
            label="Mật Khẩu"
            type="password"
            variant="outlined"
          />
          <Button
            onClick={hanleSubmit}
            variant="contained"
            type="submit"
            fullWidth
          >
            Cập Nhật
          </Button>
        </Box>
      </Container>
    </Background>
  );
};

export default SettingUser;
