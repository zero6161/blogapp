import { Box, styled, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import { Settings, SettingsRounded, Tag, Twitter } from "@mui/icons-material";

const LeftBar = () => {
  return (
    <>
      <Box flex={1}>
        <IconButton color="primary" size="large">
          <Twitter fontSize="large" />
        </IconButton>
      </Box>
      <Box>
        <IconButton color="inherit" size="large">
          <Tag fontSize="large" />
        </IconButton>
      </Box>
      <Box>
        <IconButton size="large">
          <SettingsRounded fontSize="large" color="action" />
        </IconButton>
      </Box>
    </>
  );
};

export default LeftBar;
