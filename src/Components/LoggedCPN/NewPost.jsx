import React, { useState } from "react";
import { Box, Button, styled, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { httpClient } from "../../getApi";
import { useDispatch } from "react-redux";
import { upDatePost } from "../../Redux/postSlice";
const NewPost = ({ setOpen }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [tagList, setTagList] = useState("");
  const navigate = useNavigate();
  const pushPost = (event) => {
    event.preventDefault();
    httpClient
      .post("articles", {
        article: {
          title: title,
          description: description,
          body: body,
          tagList: tagList,
        },
      })
      .then(() => {
        setOpen(false);
        navigate(0);
      });
  };

  return (
    <>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        flexBasis="auto"
        gap={3}
        mt={5}
        onSubmit={pushPost}
      >
        <TextField
          value={title}
          id="outlined-basic"
          onChange={(e) => setTitle(e.target.value)}
          label="Tiêu Đề Bài Viết"
          fullWidth
          required
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="Bài Viết Về Chủ Đề"
          fullWidth
          required
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Nội Dung"
          variant="outlined"
          multiline
          required
          value={body}
          fullWidth
          rows={3}
          onChange={(e) => setBody(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Tag"
          value={tagList}
          variant="outlined"
          onChange={(e) => setTagList(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </>
  );
};

export default NewPost;
