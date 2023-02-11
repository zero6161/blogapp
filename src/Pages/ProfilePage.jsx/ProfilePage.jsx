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
  const [favoritePost, setfavoritePost] = useState(null);
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

  useEffect(() => {
    postUserArticles();
    favoriteUserArticles();
  }, []);

  return (
    <>
      <Box>
        <Stack
          bgcolor={"background.default"}
          color={"text.primary"}
          direction="row"
          spacing={2}
          justifyContent="space-between"
        >
          <LeftBarLogged />
          <UserProfileMain postUser={postUser} favoritePost={favoritePost} />
          <RightBarLogged />
        </Stack>
      </Box>
    </>
  );
};
export default ProfilePage;
