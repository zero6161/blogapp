import React, { useState } from "react";
import { Box, Button, styled, TextField, Typography } from "@mui/material";
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
        gap={{ md: 3, sm: 5 }}
        mt={5}
        onSubmit={pushPost}
      >
        <Box>
          <Typography>Article Title</Typography>
          <TextField
            value={title}
            id="outlined-basic"
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            variant="outlined"
          />
        </Box>
        <Box>
          <Typography>What's this article about</Typography>
          <TextField
            id="outlined-basic"
            fullWidth
            required
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholde="What's this article about"
          />
        </Box>
        <Box>
          <Typography>Write your article (in markdown)</Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            multiline
            required
            value={body}
            fullWidth
            rows={3}
            onChange={(e) => setBody(e.target.value)}
          />
        </Box>
        <Box>
          <Typography>Enter tas</Typography>
          <TextField
            id="outlined-basic"
            value={tagList}
            variant="outlined"
            onChange={(e) => setTagList(e.target.value)}
            fullWidth
          />
        </Box>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </>
  );
};

export default NewPost;
