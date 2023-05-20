import { useSelector } from "react-redux";
import Loading from "../../loading/Loading";
import Post from "../post/Post";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { API } from "../../../service/api";
import { Link } from "react-router-dom";
import '../../loading/Loading.css'

const SavedBlogs = () => {
  const [posts, setPosts] = useState([]);
  const account = useSelector((state) => state.account);


  useEffect(() => {
    const fetchData = async () => {
      const res = await API.getAllBookmarkedPosts(account.id);
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
    <Box   sx={{
      display: 'grid',
      columnGap: 2,
      gridTemplateColumns: 'repeat(12, 1fr)',
      marginTop: "60px"
    }}>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
            <Box key={post._id} gridColumn="span 3">
              <Link
                to={`/details/${post._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Post post={post} />
              </Link>
            </Box>
        ))
      ) : (
        <Box style={{ color: "#878787", padding: "20px", fontSize: 38 }}>
          Nothing to display!
        </Box>
      )}
    </Box>
  );
};

export default SavedBlogs;
