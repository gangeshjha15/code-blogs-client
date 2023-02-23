import React, {useState, useEffect} from 'react';
// import { DataContext } from '../../../context/DataProvider';

import { useSelector } from "react-redux";
import {Box, TextareaAutosize, Button, styled} from '@mui/material';
import { API } from '../../../service/api';
import Comment from './Comment';

const Container = styled(Box)`
    margin-top: 50px;
    display: flex;
`;

const Image = styled('img')({
    width: 40,
    height: 40,
    borderRadius: "50%"
});

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    height: 100px;
    margin: 0 20px;
`;

const initialValues = {
    name: '',
    postId: '',
    comment: '',
    date: new Date()
}


const Comments = ({post}) => {
    // const {account} = useContext(DataContext);
    const url = 'https://cdn-icons-png.flaticon.com/512/666/666201.png';
    const account = useSelector((state) => state.account)

    const [comment, setComment] = useState(initialValues);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);


    useEffect(() => {
      const getData = async()=>{
        if(post._id){
            const res = await API.getAllComments(post._id);
            if(res.isSuccess){
                setComments(res.data);
            }
        }
      }
      getData();
    }, [post, toggle])

    const handleInput = (e)=>{
        setComment({
            name: account.name,
            postId: post._id,
            comment: e.target.value,
        })
    }

    const addComment = async()=>{
        
        const res = await API.sendComment(comment);
        if(res.isSuccess){
            setComment(initialValues);
        }
        setToggle(prevState => !prevState)
    }

    


  return (
    <Box>
        {
            sessionStorage.getItem('accessToken') ?
            <Container>
                <Image src={url} alt="User" />
                <Textarea minRows={3} placeholder='Write your comments' value={comment.comment} onChange={handleInput}/>
                <Button variant='contained' size='medium' style={{height: 40}} onClick={addComment}>Post</Button>
            </Container>
            :
            <Box>
                
            </Box>
        }
        <Box>
            {
                comments && comments.length > 0 && comments.map((comment) => 
                {
                    return <Comment key={comment._id} comment={comment} post={post} setToggle={setToggle}/>
                })
            }
        </Box>
    </Box>
  )
}

export default Comments