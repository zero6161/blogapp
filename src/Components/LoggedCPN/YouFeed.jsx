import { styled, Box, Typography, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { httpClient } from "../../getApi";
import { LoadingCircle } from "./FeedLogged";
import InfiniteScroll from "react-infinite-scroll-component";

import Post from "./Post";
export const Container = styled(Box)({
  display: "flex",
  justifyContent: "center",
});

const YouFeed = () => {
  const [usersFollow, setUsersFollow] = useState([]);
  const [currentPage1, setCurrentPage1] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [articlesCountUser, setArticlesCountUser] = useState(0);

  const apiUser = () => {
    httpClient
      .get(`articles/feed?limit=10&offset=${currentPage1}`)
      .then((res) => {
        setUsersFollow((pre) => [...pre, ...res.data.articles]);
        setHasMore(currentPage1 < res.data.articlesCount);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    apiUser();
  }, [currentPage1]);
  console.log(articlesCountUser);

  const handle = () => {
    currentPage1 > articlesCountUser
      ? setHasMore(false)
      : setCurrentPage1(currentPage1 + 10);
  };
  return (
    <>
      {usersFollow === 0 ? (
        <LoadingCircle>
          <CircularProgress />
        </LoadingCircle>
      ) : usersFollow.length > 0 && usersFollow ? (
        <InfiniteScroll
          dataLength={usersFollow.length}
          next={handle}
          hasMore={hasMore}
          loader={
            <LoadingCircle>
              <CircularProgress />
            </LoadingCircle>
          }
          scrollableTarget="scrollableDiv"
        >
          {usersFollow.map((item, index) => (
            <Box key={index}>
              <Post item={item} />
            </Box>
          ))}
        </InfiniteScroll>
      ) : (
        <Container m={12}>
          <Typography variant="h5">No articles are here... yet.</Typography>
        </Container>
      )}
    </>
  );
};
export default YouFeed;

{
  /* //   <>
//     {usersFollow === null ? (
//       <LoadingCircle>
//         <CircularProgress />
//       </LoadingCircle>
//     ) : (
//      usersFollow.length > 0 && usersFollow ?(
//       <InfiniteScroll
//       dataLength={usersFollow.length}
//       next={handle}
//       hasMore={hasMore}
//       loader={
//         <LoadingCircle>
//           <CircularProgress />
//         </LoadingCircle>
//       }
//       scrollableTarget="scrollableDiv"
//     >
//       {usersFollow ? (
//         usersFollow.map((item, index) => (
//           <Box key={index}>
//             <Post item={item} />
//           </Box>
//         ))
//       ) : (
//         <Container m={12}>
//           <Typography variant="h5">Hiện Chưa có bài viết...</Typography>
//         </Container>
//       )}
//     </InfiniteScroll>
//      )
//      </>

// )} */
}
