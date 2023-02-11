import { Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LeftBarLogged from "../../Components/LoggedCPN/LeftBarLogged";
import RightBarLogged from "../../Components/LoggedCPN/RightBarLogged";
import DetailFeed from "../../Components/PageDetail/DetailFeed";
import { httpClient } from "../../getApi";

const SlugPage = () => {
  const [slugs, setSlugs] = useState(null);
  const param = useParams();

  const apiSlug = (slug) => {
    httpClient.get(`articles/${slug}`).then((res) => {
      setSlugs(res.data.article);
    });
  };
  useEffect(() => {
    apiSlug(param.slug);
  }, [param]);
  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <LeftBarLogged />
        <DetailFeed slugs={slugs} />
        <RightBarLogged />
      </Stack>
    </>
  );
};

export default SlugPage;
