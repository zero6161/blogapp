import {
  Avatar,
  Box,
  Card,
  CardContent,
  TextField,
  CardHeader,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { httpClient } from "../../getApi";
const Comments = ({ slugURL }) => {
  const [valueInput, setValueInput] = useState("");
  const [getComments, setGetComments] = useState([]);
  const [comment, setComment] = useState([]);

  const getComment = () => {
    httpClient
      .get(`articles/${slugURL}/comments`)
      .then((res) => {
        setGetComments(res.data.comments);
      })
      .catch((error) => console.log(error));
  };
  const deleteAComment = (id) => {
    httpClient
      .delete(`articles/${slugURL}/comments/${id}`)
      .then(() => getComment());
  };
  const postComment = (e) => {
    e.preventDefault();
    httpClient
      .post(`articles/${slugURL}/comments`, {
        comment: {
          body: valueInput,
        },
      })
      .then((res) => {
        setValueInput("");
        setComment(res.data.comment);
      });
  };
  useEffect(() => {
    getComment();
  }, [slugURL, getComments]);
  return (
    <>
      <Box>
        {getComments
          .sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 0))
          .map((comment) => (
            <Card
              key={comment.id}
              sx={{
                marginY: 4,
              }}
            >
              <Box display="flex" justifyContent="space-between">
                <CardHeader
                  avatar={<Avatar src={comment.author.image} />}
                  title={
                    <Typography
                      component="p"
                      variant="body2"
                      color="text.primary"
                      underline="hover"
                    >
                      {comment.author.username}
                    </Typography>
                  }
                  subheader="September 14, 2016"
                />
                <IconButton onClick={() => deleteAComment(comment.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
              <CardContent>
                <Typography variant="subtitle1">{comment.body}</Typography>
              </CardContent>
            </Card>
          ))}
        <Box component="form" onSubmit={postComment}>
          <TextField
            id="standard-basic"
            label="Để Lại Bình Luận"
            variant="standard"
            fullWidth
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
          />
        </Box>
      </Box>
    </>
  );
};

export default Comments;
