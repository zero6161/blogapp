import {
  Avatar,
  Box,
  Button,
  Fab,
  IconButton,
  Modal,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Add as AddIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NewPost from "./NewPost";

const Add = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleCloseLogin = () => {
    setOpen(false);
    navigate("/home");
  };
  const handleOpenLogin = () => {
    setOpen(true);
  };
  const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "5px 0",
    justifyContent: "center",
  });
  const userData = useSelector((state) => state.user.user);
  const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });
  return (
    <>
      <Tooltip
        onClick={handleOpenLogin}
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
      <StyledModal
        open={open}
        onClose={handleCloseLogin}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={{ md: 400, sm: "100vw" }}
          height={"auto"}
          bgcolor="white"
          p={3}
          borderRadius={5}
        >
          <Typography variant="h6" color="gray" textAlign="center">
            Create a post
          </Typography>
          <UserBox>
            <Avatar
              src={`${userData.image}`}
              sx={{
                width: 30,
                height: 30,
              }}
            />
            <Typography fontWeight={500} variant="body1">
              {userData.username}
            </Typography>
          </UserBox>
          <NewPost setOpen={setOpen} />
        </Box>
      </StyledModal>
    </>
  );
};
export default Add;
