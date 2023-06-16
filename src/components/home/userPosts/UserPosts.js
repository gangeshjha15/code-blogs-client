import { useSelector } from "react-redux";
import Loading from "../../loading/Loading";
import Post from "../post/Post";
import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { API } from "../../../service/api";
import { Link } from "react-router-dom";
import '../../loading/Loading.css'

const UserPost = () => {
  const [posts, setPosts] = useState([]);
  const account = useSelector((state) => state.account);


  useEffect(() => {
    const fetchData = async () => {
      const res = await API.getUserPosts(account.id);
      if (res.isSuccess) {
        setPosts(res.data);
      }
    };
    fetchData();
  }, []);

  const isLoading = useSelector((state) => state.loading);

  if (isLoading) {
    return (
      <Box sx={{
        marginTop: "80px",
        marginRight: "40px"
      }}>
        <Loading />
      </Box>
    );
  }
  return (
<>
<Grid container spacing={2} mt={7}>
  {posts && posts.length > 0 ? (
    posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={4} lg={3}>
          <Link
            to={`/details/${post._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Post post={post} />
          </Link>
        </Grid>
    ))
  ) : (
    <Box style={{ color: "#878787", padding: "20px", fontSize: 38 }}>
      Nothing to display!
    </Box>
  )}
</Grid>
</>
  );
};

export default UserPost;
