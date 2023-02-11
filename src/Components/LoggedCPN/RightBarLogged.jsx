import { Box, Card, InputBase, styled, Typography, Link } from "@mui/material";
import React, { useState } from "react";
import { Search } from "../HomeCPN/Feed";
import TagFeed from "../HomeCPN/TagFeed";

const RightBarLogged = ({ value, setValue }) => {
  const [title, setTitle] = useState([]);
  // const [descrip]
  const CardContainer = styled(Card)({
    display: "flex",
    flexDirection: "column",
    bgcolor: "background.paper",
    mt: 3,
    borderRadius: 4,
  });
  return (
    <Box flex={2} px={2} display={{ xs: "none", sm: "none", md: "block" }}>
      <Box>
        <CardContainer>
          <Typography
            variant="h5"
            textAlign="center"
            sx={{ fontWeight: "bold", m: 1 }}
          >
            Trends For You
          </Typography>
          <TagFeed
            value={value}
            setValue={setValue}
            bgColor={"background.paper"}
          />
        </CardContainer>
      </Box>
    </Box>
  );
};

export default RightBarLogged;
