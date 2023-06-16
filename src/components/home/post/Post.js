import React from 'react'
import { Box, Typography, styled } from '@mui/material'
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import {
  ThumbUp
} from "@mui/icons-material";
import { addElipsis } from '../../../utills/common-utils';
// import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
// import { API } from "../../../service/api";
// import { useSelector } from "react-redux";


const Container = styled(Box)`
  border: 1px solid #d3cede;
  border-radius: 10px;
  margin: 15px ;
  height: 315px;
  background: #F9F5E7;
  & > p{
    padding: 0 5px 5px 5px;
  }
  transition: transform 0.2s ease-in-out;
  &:hover{
    transform: scale(1.08);
  }
  
`;



const Image = styled('img')({
  width:'100%',
  objectFit: 'cover',
  height: '150px',
  borderRadius: '10px 10px 0 0',
})

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;
const Thumb = styled(ThumbUp)`
  float: right;
`;
const Heading = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
`;
const Details = styled(Typography)`
  font-size: 14px;
  word-break: break-word;
`;
const LikeCount = styled(Typography)`
  float: right;
  margin-right: 5px;
  margin-top: 3px;
`;
const InnerBox = styled(Box)`
  margin: 7px;
`;
const LowerBox = styled(Box)`
  margin-left: 7px;
  margin-right: 7px;
  margin-top: 10px;
`;


const Post = ({post}) => {

  //working on it
  // const account = useSelector((state) => state.account);

  return (
    <Container>
      <Link to={`details/${post._id}`} style={{textDecoration:'none', color:'inherit'}}>
        <Image src={post.picture} alt="Blog"/>
        <InnerBox>
          <Text>{post.category}</Text>
          <Heading>{addElipsis(post.title, 25)}</Heading>
          <Text>{post.name}</Text>
          {/* <Details noWrap>{addElipsis(post.description, 60)}</Details> */}
          <Details noWrap>{post.description}</Details>
        </InnerBox>
      </Link>
        <LowerBox>
          { (sessionStorage.getItem("accessToken")) ? 
            (<TurnedInIcon style={{cursor: 'pointer'}}/>)
            :
            (<TurnedInNotIcon style={{cursor: 'pointer'}}/>)
          }
          <LikeCount>{post.likes ? post.likes.length : ""} likes</LikeCount>
          <Thumb style={{marginRight: '3px'}}/>
        </LowerBox>
    </Container>
  )
}

export default Post