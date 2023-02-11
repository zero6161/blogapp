import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  styled,
  IconButton,
  Box,
  Avatar,
  CardHeader,
  TextField,
  Collapse,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { httpClient } from "../../getApi";
import { AddAlarm, CloseSharp } from "@mui/icons-material";
import Comments from "./Comments";

const DetailFeed = () => {
  const [slugs, setSlugs] = useState(null);
  const param = useParams();

  const apiSlug = (slug) => {
    httpClient.get(`articles/${slug}`).then((res) => {
      setSlugs(res.data.article);
    });
  };
  const CardContainer = styled(Card)({});
  useEffect(() => {
    apiSlug(param.slug);
  }, [param]);

  return (
    <Box
      sx={{
        bgcolor: "white",
      }}
    >
      <CardContainer
        sx={{
          height: "fit-content",
        }}
      >
        <Typography p={2} textAlign="center" variant="h5">
          Bài viết của {slugs?.author.username}
        </Typography>
        <CardHeader
          avatar={<Avatar src={slugs?.author.image} />}
          title={
            <Typography
              component="p"
              variant="body2"
              color="text.primary"
              underline="hover"
            >
              {slugs?.author.username}
            </Typography>
          }
          subheader="September 14, 2016"
        />
        <CardContent>
          <Typography gutterBottom variant="body1" component="div">
            {slugs?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {slugs?.description}
          </Typography>
          {slugs?.tagList.map((tag, i) => (
            <Typography variant="caption" key={i} m={3} color="primary">
              {`#${tag}`}
            </Typography>
          ))}

          <Comments slugURL={param.slug} />
        </CardContent>
      </CardContainer>
      {/* <Typography p={2} textAlign="center" variant="h5">
        Bài viết của {slugs?.author.username}
      </Typography>{" "}
      <Typography gutterBottom variant="body1" component="div">
        {slugs?.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {slugs?.description}
      </Typography>
      {slugs?.tagList.map((tag, i) => (
        <Typography variant="caption" key={i} m={3} color="primary">
          {`#${tag}`}
        </Typography>
      ))}
      <Comments slugURL={param.slug} /> */}
    </Box>
  );
};

export default DetailFeed;
