import { Box, Grid, Stack, ThemeProvider, createTheme } from "@mui/material";
import React, { useMemo, useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { httpClient } from "../../getApi";
import LeftBarLogged from "../../Components/LoggedCPN/LeftBarLogged";
import RightBarLogged from "../../Components/LoggedCPN/RightBarLogged";
import UserProfileMain from "../../Components/UserProfileMain/UserProfileMain";
import SlugPage from "../SlugPage/SlugPage";
const ProfilePage = () => {
  const [userKey, setUserKey] = useState("myarticles");
  const [postUser, setPostUser] = useState([]);
  const [favoritePost, setfavoritePost] = useState([]);
  const { usernamedetail } = useParams();

  const postUserArticles = () => {
    httpClient
      .get(`articles?author=${usernamedetail}&limit=20&offset=0`)
      .then((res) => {
        setPostUser(res.data.articles);
      })
      .catch((error) => console.log(error));
  };
  const favoriteUserArticles = () => {
    httpClient
      .get(`articles?favorited=${usernamedetail}&limit=20&offset=0`)
      .then((res) => {
        setfavoritePost(res.data.articles);
      })
      .catch((error) => console.log(error));
  };
  const setFavourite = (article) => {
    const index = favoritePost.findIndex((a) => a.slug === article.slug);
    if (index < 0) return;
    const cloneUserFeeds = [...favoritePost];
    const selectedArticle = { ...cloneUserFeeds[index] };
    const currentFavourite = selectedArticle.favorited;
    selectedArticle.favorited = !currentFavourite;
    selectedArticle.favoritesCount += currentFavourite ? -1 : 1;
    cloneUserFeeds[index] = selectedArticle;
    setfavoritePost(cloneUserFeeds);
  };
  useEffect(() => {
    postUserArticles();
    favoriteUserArticles();
  }, [favoritePost]);

  return (
    <>
      <Box>
        <Stack
          bgcolor={"background.default"}
          color={"text.primary"}
          direction="row"
          spacing={{ md: 2, xs: "0", sm: "0" }}
          justifyContent="space-between"
        >
          <LeftBarLogged />
          <UserProfileMain
            postUser={postUser}
            setFavourite={setFavourite}
            favoritePost={favoritePost}
          />
          <RightBarLogged />
        </Stack>
      </Box>
    </>
  );
};
export default ProfilePage;
