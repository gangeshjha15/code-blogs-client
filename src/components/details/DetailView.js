import { Box, Typography, styled, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API } from "../../service/api";
import {
  Edit,
  Delete,
  ThumbUp,
  ThumbUpOffAltOutlined,
} from "@mui/icons-material";
// import { DataContext } from "../../context/DataProvider";
import Comments from "./comments/Comments";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",

  [theme.breakpoints.down("md")]: {
    margin: "5px",
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const Heading = styled(Typography)`
  font-size: 30px;
  font-weight: 600;
  margin: 50px 0 10px 0;
  word-break: break-word;
  text-align: center;
`;
const Description = styled(Typography)`
  word-break: break-word;
`;

const EditIcon = styled(Edit)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;
const DeleteIcon = styled(Delete)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
  }
`;
const OnIcon = styled(ThumbUp)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;
const OffIcon = styled(ThumbUpOffAltOutlined)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;
const LikeCount = styled(Typography)`
  margin: 5px;
  padding: 5px;
`;

const Author = styled(Box)`
  color: #878787;
  display: flex;
  margin: 20px 0;
`;

const DetailView = () => {
  const { id } = useParams();
  // const { account } = useContext(DataContext);
  const navigate = useNavigate();
  const account = useSelector((state) => state.account);

  const [post, setPost] = useState({});

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };


  const url = post.picture
    ? post.picture
    : "https://img.freepik.com/free-photo/top-view-person-writing-laptop-with-copy-space_23-2148708035.jpg?w=1060&t=st=1667457422~exp=1667458022~hmac=d99773fc3688df34ff41d0ecd396c4f030dae3f5333c69bebeaa3079c38c1d14";

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.getPostById(id);
      if (res.isSuccess) {
        setPost(res.data);
        // console.log(res.data);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const like = async () => {
    const res = await API.likePost({ postId: post._id });
    if (res.isSuccess) {
      setPost(res.data.post);
    }
  };
  const disLike = async () => {
    const res = await API.disLikePost({ postId: post._id });
    if (res.isSuccess) {
      // console.log(res.data);
      setPost(res.data.post);
    }
  };

  const openDialog = ()=>{
    setOpen(true);
  }
  const deleteBlog = async () => {
    const res = await API.deletePost(post._id);
    if (res.isSuccess) {
      toast.success("Blog deleted successfully!")
      navigate("/");
    }
  };

  return (
    <Container>
      <Image src={url} alt="Profile" />
      <Box style={{ float: "right" }}>
        {account.email === post.email && (
          <>
            <Link to={`/update/${post._id}`}>
              <EditIcon color="primary" />
            </Link>
            <DeleteIcon onClick={openDialog} color="error" />

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Are you sure you want to delete?
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={deleteBlog} autoFocus>Delete</Button>
              </DialogActions>
            </Dialog>

          </>
        )}
      </Box>
      {sessionStorage.getItem("accessToken") ? (
        <Box style={{ float: "left" }}>
          {post.likes && post.likes.includes(account.id) ? (
            <OnIcon cursor="pointer" onClick={disLike} />
          ) : (
            <OffIcon cursor="pointer" onClick={like} />
          )}
          <LikeCount>{post.likes ? post.likes.length : ""} likes</LikeCount>
        </Box>
      ) : (
        <Box style={{ float: "left" }}>
          <OnIcon cursor="pointer" />
          <LikeCount>{post.likes ? post.likes.length : ""} likes</LikeCount>
        </Box>
      )}
      <Heading>{post.title}</Heading>

      <Author>
        <Typography>
          Author:
          <Box component="span" style={{ fontWeight: "600" }}>
            {post.name}
          </Box>
        </Typography>
        <Typography style={{ marginLeft: "auto" }}>
          {new Date(post.createdDate).toDateString()}
        </Typography>
      </Author>

      <Description dangerouslySetInnerHTML={{__html: post.description}}/>
      <Comments post={post} />
    </Container>
  );
};

export default DetailView;
