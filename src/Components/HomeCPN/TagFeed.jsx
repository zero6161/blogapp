import React, { useState, useEffect } from "react";
import { httpClient } from "../../getApi";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Link } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changlePost, handleOpen, handleType } from "../../Redux/tagsSlice";
import { Navigate, useNavigate } from "react-router-dom";

const TagFeed = ({ bgColor }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tagName, setTagName] = useState([]);
  const [tagName1, setTagName1] = useState("");
  const tags = () => {
    httpClient
      .get("tags")
      .then((res) => {
        setTagName(res.data.tags);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    tags();
  }, []);

  const auth = useSelector((state) => state.user.user.token);
  console.log(auth);
  const handleTag = (hagTag) => {
    dispatch(handleType(hagTag));
    dispatch(changlePost(hagTag));
  };
  const hagTagname = useSelector((state) => state.tag);

  return (
    <>
      {tagName.map((tag, i) => (
        <Card
          onClick={() => handleTag(tag)}
          key={i}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: `${bgColor}`,
          }}
        >
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="subtitle2" component="div">
                Trending in Vietnam
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {tag}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </>
  );
};

export default TagFeed;
