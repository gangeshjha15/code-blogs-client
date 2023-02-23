import {  useSelector } from 'react-redux';
import Loading from "../../loading/Loading";
import Post from '../post/Post';
import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { API } from "../../../service/api";
import { Link } from 'react-router-dom';

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

      if(isLoading){
        return(
          <Loading/>
        );
      }
  return (
    <Box sx={{ width: '100%' }} style={{background: "#7A6F74"}}>
        {posts && posts.length > 0 ? (
        posts.map((post) =>
        <Grid key={post._id} item xs={12} lg={3} sm={4}>
          <Link to={`details/${post._id}`} style={{textDecoration:'none', color:'inherit'}}>
            <Post post={post} />
          </Link>
        </Grid>
        )
      ) : (
        <Box style={{ color: "#878787", margin: "10px auto", fontSize: 38}}>
          Nothing to display!
        </Box>
      )}
    </Box>
  )
}

export default UserPost;