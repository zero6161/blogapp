import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  styled,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import paper from "../image/paper.jpg";
import Post from "../LoggedCPN/Post";
import { LoadingCircle, TabPanel } from "../LoggedCPN/FeedLogged";
import { Container } from "../LoggedCPN/YouFeed";
import { httpClient } from "../../getApi";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const UserProfileMain = ({ postUser, favoritePost, setFavourite }) => {
  const [value, setValue] = React.useState("userpage");
  const [profile, setProfile] = useState([]);
  const { usernamedetail } = useParams();
  const navigate = useNavigate();
  const userDetail = () => {
    httpClient
      .get(`profiles/${usernamedetail}`)
      .then((res) => {
        setProfile(res.data.profile);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    userDetail();
  }, [usernamedetail]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const userName = useSelector((state) => state.user.user.username);
  console.log(userName);
  const BackgroundImg = styled(Box)({
    backgroundImage: `url(${paper})`,
    // minWidth: "100vw",
    height: "50vh",
    width: "auto",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  });
  const folower = () => {
    httpClient
      .post(`profiles/${profile.username}/follow`)
      .then(() => userDetail());
  };
  const unFolower = () => {
    httpClient
      .delete(`profiles/${profile.username}/follow`)
      .then(() => userDetail());
  };
  // const setFavourite = (article) => {
  //   const index = profile.findIndex((a) => a.slug === article.slug);
  //   if (index < 0) return;
  //   const cloneUserFeeds = [...profile];
  //   const selectedArticle = { ...cloneUserFeeds[index] };
  //   const currentFavourite = selectedArticle.favorited;
  //   selectedArticle.favorited = !currentFavourite;
  //   selectedArticle.favoritesCount += currentFavourite ? -1 : 1;
  //   cloneUserFeeds[index] = selectedArticle;
  //   setProfile(cloneUserFeeds);
  // };
  return (
    <Box flex={4}>
      <BackgroundImg />
      <Box display="flex" justifyContent="space-around">
        <Box display="flex">
          <Avatar
            sx={{
              width: 80,
              mt: -4,
              height: 80,
            }}
            src={`${profile.image}`}
          />
          <Typography variant="h6" textAlign="center">
            {profile.username}
          </Typography>{" "}
        </Box>
      </Box>
      <Box marginY={3} display="flex" justifyContent="space-around">
        {usernamedetail === userName ? (
          <Button onClick={() => navigate("/setting")} variant="outlined">
            <Typography variant="body2">
              Setting Your Profile {profile.username}
            </Typography>
          </Button>
        ) : (
          <Button
            onClick={() => (profile.following ? unFolower() : folower())}
            variant="outlined"
          >
            <Typography variant="body2">
              {profile.following
                ? `Unfollow ${profile.username}`
                : `Follow  ${profile.username}`}
            </Typography>
          </Button>
        )}
      </Box>
      <Box mt={2}>
        <Tabs
          variant="fullWidth"
          value={value}
          centered
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab value="userpage" label="B??i Vi???t" />
          <Tab value="favorite" label="Y??u Th??ch" />
        </Tabs>
        <TabPanel value={value} index={"userpage"}>
          {postUser.map((item, index) => (
            <Box key={index}>
              <Post setFavourite={setFavourite} item={item} />
            </Box>
          ))}
        </TabPanel>
        <TabPanel value={value} index={"favorite"}>
          {favoritePost === null ? (
            <LoadingCircle>
              <CircularProgress />
            </LoadingCircle>
          ) : favoritePost.length > 0 ? (
            favoritePost.map((item, index) => (
              <Box key={index}>
                <Post item={item} />
              </Box>
            ))
          ) : (
            <Container m={12}>
              <Typography variant="h5">No articles are here... yet.</Typography>
            </Container>
          )}
        </TabPanel>
      </Box>
    </Box>
  );
};

export default UserProfileMain;
