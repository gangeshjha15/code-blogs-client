import { useSelector } from "react-redux";
// import { DataContext } from "../../../context/DataProvider";
import { Box, Typography, styled, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { API } from "../../../service/api";


const StyledTooltip = styled(Tooltip)`
  margin-left: auto;
`;
const Component = styled(Box)`
  margin-top: 30px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 10px;
`;
const Container = styled(Box)`
  margin-bottom: 5px;
  display: flex;
`;
const Name = styled(Typography)`
  font-weight: 600;
  margin-right: 20px;
  font-size: 18px;
`;
const StyledDate = styled(Typography)`
  font-size: 14px;
  color: #878787;
`;

const Comment = ({ comment, setToggle, post }) => {
  // const { account } = useContext(DataContext);
  const account = useSelector((state) => state.account)
  const removeComment = async () => {
    // console.log(comment._id);
    const res = await API.deleteComment({postId: post._id, commentId: comment._id});
    if (res.isSuccess) {
      setToggle((prevState) => !prevState);
    }
  };
  return (
    <Component>
      <Container>
        <Name>{comment.name}</Name>
        <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
        { sessionStorage.getItem('accessToken') && comment.name === account.name && (
          <StyledTooltip title="Delete">
            <IconButton>
              <Delete color="error" onClick={removeComment} />
            </IconButton>
          </StyledTooltip>
        )}
      </Container>
      <Box>
        <Typography>{comment.comment}</Typography>
      </Box>
    </Component>
  );
};

export default Comment;
