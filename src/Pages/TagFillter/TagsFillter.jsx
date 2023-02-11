import { httpClient } from "../../getApi";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Post from "../../Components/LoggedCPN/Post";
import { Box } from "@mui/material";

export const TagsFillter = () => {
  const [tagName, setTagName] = useState([]);
  const value = useSelector((state) => state.tag.isTagOpen);

  const callHashTag = () => {
    httpClient.get(`articles?tag=${value}&limit=20&offset=0`).then((res) => {
      setTagName(res.data.articles);
    });
  };
  useEffect(() => {
    callHashTag();
  }, [value]);

  return (
    <>
      {tagName.map((item, index) => (
        <Box key={index}>
          <Post item={item} />
        </Box>
      ))}
    </>
  );
};
