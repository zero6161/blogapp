import { Box, styled, Tabs, Tab, CircularProgress } from "@mui/material";
import React, { useState, useEffect, useRef, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { httpClient } from "../../getApi";
import { TagsFillter } from "../../Pages/TagFillter/TagsFillter";
import {
  changlePost,
  deletType,
  handleOpen,
  handleType,
} from "../../Redux/tagsSlice";

import Post from "./Post";
import YouFeed from "./YouFeed";

export const LoadingCircle = styled(Box)({
  display: "flex",
  justifyContent: "center",
  overflow: "hidden",
});
export function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{}}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

const FeedLogged = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const [articlesCount, setArticlesCount] = useState(0);
  const [feed, setFeed] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const type = useSelector((state) => state.tag.type);
  const api = () => {
    httpClient
      .get(`articles?limit=10&offset=${currentPage}`)
      .then((res) => {
        setFeed((pre) => [...pre, ...res.data.articles]);
        setArticlesCount(res.data.articlesCount);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    api();
  }, [currentPage]);
  const value = useSelector((state) => state.tag.isTagOpen);

  const handleChange = (event, newValue) => {
    dispatch(changlePost(newValue));
    dispatch(handleType(""));
  };
  console.log(type);
  const setFavourite = (article) => {
    // TO DO: update state articles
    const index = feed.findIndex((a) => a.slug === article.slug);
    if (index < 0) return;
    const cloneUserFeeds = [...feed];
    const selectedArticle = { ...cloneUserFeeds[index] };
    const currentFavourite = selectedArticle.favorited;
    selectedArticle.favorited = !currentFavourite;
    selectedArticle.favoritesCount += currentFavourite ? -1 : 1;
    cloneUserFeeds[index] = selectedArticle;
    setFeed(cloneUserFeeds);
  };
  const handle = () => {
    currentPage > articlesCount
      ? setHasMore(false)
      : setCurrentPage(currentPage + 10);
  };

  return (
    <>
      <Box flex={4}>
        <Box>
          <Tabs
            variant="standard"
            value={value}
            centered
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            sx={{
              ml: 2,
            }}
          >
            <Tab value="homepage" label="Trang Chủ" />
            <Tab value="youfeed" label="Người Bạn Quan Tâm" />
            <Tab value={type} label={type} />
          </Tabs>
          <TabPanel value={value} index={"homepage"}>
            <InfiniteScroll
              dataLength={feed.length}
              next={handle}
              hasMore={true}
              loader={
                <LoadingCircle>
                  <CircularProgress />
                </LoadingCircle>
              }
              scrollableTarget="scrollableDiv"
            >
              {feed.map((item, index) => (
                <Box key={index}>
                  <Post item={item} setFavourite={setFavourite} />
                </Box>
              ))}
            </InfiniteScroll>{" "}
          </TabPanel>
          <TabPanel value={value} index={"youfeed"}>
            <YouFeed />
          </TabPanel>

          <TabPanel value={value} index={type}>
            <TagsFillter />
          </TabPanel>
        </Box>
      </Box>
    </>
  );
};

export default FeedLogged;
