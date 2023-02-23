import React from 'react'
import { Box, Typography, styled } from '@mui/material'
import { addElipsis } from '../../../utills/common-utils'; 

const Container = styled(Box)`
  border: 1px solid #d3cede;
  border-radius: 10px;
  margin: 15px ;
  height: 300px;
  background: #F9F5E7;
  & > p{
    padding: 0 5px 5px 5px;
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
const Heading = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
`;
const Details = styled(Typography)`
  font-size: 14px;
  word-break: break-word;
`;


const Post = ({post}) => {
  return (
    <Container>
        <Image src={post.picture} alt="Blog"/>
        <Text>{post.category}</Text>
        <Heading>{addElipsis(post.title, 25)}</Heading>
        <Text>{post.name}</Text>
        {/* <Details noWrap>{addElipsis(post.description, 60)}</Details> */}
        <Details noWrap>{post.description}</Details>
    </Container>
  )
}

export default Post