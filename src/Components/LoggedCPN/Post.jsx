import React from "react";
import {
  Delete,
  Favorite,
  FavoriteBorder,
  MoreVert,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  IconButton,
  Link,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Modaldetail } from "../Modal";
import { httpClient } from "../../getApi";
import { useSelector } from "react-redux";
const Post = ({ item, index, setFavourite }) => {
  const navigate = useNavigate();
  const handleCloseLogin = () => {
    setOpen(false);
    navigate(-1);
  };
  const handleOpenLogin = () => {
    setOpen(true);
    navigate(`article/${item.slug}`);
  };

  const favoritedd = () => {
    // if (!getUser) {
    //   navigate("/login");
    //   return;
    // }
    if (setFavourite) setFavourite(item);

    httpClient.post(`articles/${item.slug}/favorite`);
  };
  const deletePost = () => {
    httpClient.delete(`articles/${item.slug}`).then(() => navigate(0));
  };
  const unFavorite = () => {
    // if (setFavourite) setFavourite(item);
    httpClient.delete(`articles/${item.slug}/favorite`);
  };

  const [open, setOpen] = useState(false);
  const [isDrawOpen, setIsDrawOpen] = useState(false);

  const ContainerBox = styled(Box)({
    px: 2,
    "&:hover": {
      backgroundColor: "rgb(237,241,242)",
    },
  });
  const userName = useSelector((state) => state.user.user.username);
  return (
    <>
      <Box key={index}>
        <Card key={index} sx={{ margin: 2 }}>
          <ContainerBox>
            <CardHeader
              avatar={<Avatar src={item.author.image} />}
              action={
                item.author.username === userName ? (
                  <IconButton onClick={deletePost} aria-label="settings">
                    <Delete />
                  </IconButton>
                ) : (
                  ""
                )
              }
              title={
                <Typography
                  component={Link}
                  variant="body2"
                  color="text.primary"
                  href={`/${item.author.username}`}
                  underline="hover"
                >
                  {item.author.username}
                </Typography>
              }
              subheader="September 14, 2016"
            />
            <Typography
              onClick={handleOpenLogin}
              variant="body2"
              color="text.primary"
              sx={{ pb: 2, pl: 2, cursor: "pointer" }}
            >
              {item.title}
            </Typography>
            <CardContent>
              <Typography
                onClick={handleOpenLogin}
                sx={{
                  cursor: "pointer",
                }}
                variant="body2"
                color="text.primary"
              >
                {item.description}
              </Typography>
            </CardContent>
            <CardContent>
              {item.tagList.map((item, index) => (
                <Link
                  href={item}
                  mr={3}
                  underline="hover"
                  variant="caption"
                  key={index}
                >{`#${item}`}</Link>
              ))}
            </CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box display="flex">
                <IconButton
                  onClick={() => {
                    item.favorited ? unFavorite() : favoritedd();
                  }}
                >
                  <Favorite color={item.favorited ? "error" : "inherit"} />
                </IconButton>
                <Typography alignSelf="center" variant="body1">
                  {item.favoritesCount}
                </Typography>
              </Box>
              <IconButton onClick={handleOpenLogin}>
                <Typography>Read More</Typography>
              </IconButton>
            </Box>
            <Modaldetail open={open} handleCloseLogin={handleCloseLogin} />
          </ContainerBox>
        </Card>
      </Box>
    </>
  );
};

export default Post;
