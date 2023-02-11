import {
  InputBase,
  Box,
  styled,
  Card,
  Typography,
  Button,
  Link,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TagFeed from "./TagFeed";
export const Search = styled("div")(({ theme }) => ({
  backgroundColor: "#EFF3F4",
  padding: "6px 20px",
  borderRadius: "15px",
  // width: "100%",
}));
const Feed = () => {
  const [readMore, setReadMore] = useState("hidden");
  const tag = useParams();

  return (
    <>
      <Box position="relative">
        <Box overflow={readMore} height="80vh">
          <Card
            variant="outlined"
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* <Search sx={{}}>
              <InputBase placeholder="Search" />
            </Search> */}
            <Typography
              variant="h5"
              textAlign="center"
              sx={{ fontWeight: "bold", m: 1 }}
            >
              Trends For You
            </Typography>
            <Box marginBottom={2} display="flex" justifyContent="center">
              {readMore === "hidden" ? (
                <Button
                  sx={{
                    display: `${readMore === "none" ? "none" : "block"}`,
                  }}
                  variant="contained"
                  onClick={(e) => setReadMore("none")}
                >
                  Read More
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={(e) => setReadMore("hidden")}
                >
                  Hide
                </Button>
              )}
            </Box>
            <TagFeed />
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default Feed;
