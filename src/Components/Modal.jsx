import {
  Avatar,
  Box,
  Button,
  IconButton,
  Modal,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { useSelector } from "react-redux";
export const ModalLogin = (props) => {
  const { open, handleCloseLogin } = props;
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: { md: 400, sm: "80vh" },
    bgcolor: "background.paper",
    border: "1px solid #000",
    borderRadius: 3,
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  return (
    <Modal
      open={open}
      onClose={handleCloseLogin}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton onClick={handleCloseLogin}>
          <CloseSharpIcon />
        </IconButton>
        <Outlet />
      </Box>
    </Modal>
  );
};

export const Modaldetail = (props) => {
  const { open, handleCloseLogin } = props;
  const DetailPost = styled(Box)({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "scroll",
    maxHeight: "100vh",
    display: "block",
    bgcolor: "background.paper",
    border: "1px solid #000",
    overflowX: "hidden",
    overflowY: "scroll",
    borderRadius: "5px",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  });

  return (
    <>
      <Modal
        open={open}
        onClose={handleCloseLogin}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DetailPost>
          <Outlet />
        </DetailPost>
      </Modal>
    </>
  );
};
