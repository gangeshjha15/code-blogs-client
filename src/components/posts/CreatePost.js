import React, { useState,  useRef } from "react";
import {
  Box,
  styled,
  FormControl,
  InputBase,
  Button,
  TextField,
  Autocomplete,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import IconButton from "@mui/material/IconButton";
import MicIcon from "@mui/icons-material/Mic";
import { useNavigate } from "react-router-dom";
// import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";
import { top20Categories } from "../../constants/data";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

//Rich Editor Text
import JoditEditor from "jodit-react";

const Image = styled("img")({
  marginTop: "10px",
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",

  [theme.breakpoints.down("md")]: {
    margin: "5px",
  },
}));

const StyledFormControl = styled(FormControl)`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
`;
const StyledInputBase = styled(InputBase)`
  flex: 1;
  font-size: 18px;
  border: 1px solid grey;
  padding: 0 10px;
  border-radius: 5px;
`;

const TextArea = styled(JoditEditor)`
  margin-top: 20px;
`;

const ButtonContainer = styled(Box)`
  margin-top: 20px;
  margin: "50px 100px";
`;

const Mic = styled(MicIcon)`
  margin: 5px;
  padding: 5px;
`;

const FillIconButton = styled(IconButton)`
  background: #ff4444;
  color: white;
  &:hover {
    background: #ff4444;
  }
`;

const StyledButton = styled(Button)`
  margin: 10px;
`;

const initialPost = {
  title: "",
  description: "",
  name: "",
  email: "",
  createdDate: new Date(),
  category: "",
  picture: "",
};

const CreatePost = () => {
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const [toggle, setToggle] = useState(false);

  const [desc, setDesc] = useState("");
  const editor = useRef(null);

  const account = useSelector((state) => state.account);

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({
    onResult: (transcript) => {
      setDesc(transcript);
    },
  });

  const url = post.picture
    ? post.picture
    : "https://img.freepik.com/free-photo/top-view-person-writing-laptop-with-copy-space_23-2148708035.jpg?w=1060&t=st=1667457422~exp=1667458022~hmac=d99773fc3688df34ff41d0ecd396c4f030dae3f5333c69bebeaa3079c38c1d14";

  // const { account } = useContext(DataContext);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setPost({ ...post, description: transcript });
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setFile(e.target.files[0]);
    // setPost({picture: e.target.files[0]});
  };

  //Save Post to database on clicking the publish button
  const savePost = async () => {
    post.name = account.name;

    post.email = account.email;
    if (!post.picture) post.picture = post.picture ? post.picture : url;
    post.category = post.category ? post.category : "General";

    post.description = desc;

    if(post.description === '' || post.title === ''){
      return toast.warn("Please fill out the required fields!");
    }

    const res = await API.createPost(post);
    console.log(res);
    if (res.isSuccess) {
      toast.success("Post created successfully!")
      setPost(initialPost);
      navigate("/");
    }else if(res.status === 500){
      toast.error("Internal server error!");
    }
  };

  const getImage = async () => {
    if (file) {
      let data = new FormData();
      data.append("name", file.name);
      data.append("file", file);

      const res = await API.fileUpload(data);
      // if (res.isSuccess) {

      // }
      post.picture = await res.data.imageUrl;
    }
  };

  const listen = () => {
    if (!browserSupportsSpeechRecognition) {
      toast.warning("Your browser doesn't support speech recognition!")
    } else{
      setToggle(!toggle);
      SpeechRecognition.startListening({ continuous: true });
    }
  };
  const stopListen = () => {
    setToggle(!toggle);
    SpeechRecognition.stopListening();
  };

  return (
    <>
      <Container>
        <Image src={url} alt="BlogImage" />
        <Autocomplete
          inputValue={post.category}
          onInputChange={(event, newValue) => {
            setPost({ ...post, category: newValue });
          }}
          style={{ marginTop: "20px"}}
          disablePortal
          id="combo-box-demo"
          options={top20Categories}
          renderInput={(params) => (
            <TextField {...params} label="Choose Categories" />
          )}
        />
        <StyledFormControl>
          <label htmlFor="fileInput">
            <AddPhotoAlternateIcon fontSize="large" color="action" />
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImage}
          />
          <Button variant="text" onClick={getImage}>
            Upload
          </Button>

          <StyledInputBase
            placeholder="Title"
            name="title"
            onChange={handleInput}
          />
        </StyledFormControl>
        {/* {listening ? (
        <TextArea
          id="text-area"
          minRows={5}
          placeholder="Description"
          name="description"
          onChange={(event) => setDesc(event.target.value)}
          value={transcript}
        />
      ) : (
        <TextArea
          id="text-area"
          minRows={5}
          placeholder="Description"
          name="description"
          onChange={(event) => setDesc(event.target.value)}
          value={desc}
        />
      )} */}

        <TextArea
          ref={editor}
          value={transcript}
          onChange={(newContent) => setDesc(newContent)}
        />

        <ButtonContainer>
          {!toggle ? (
            <IconButton
              aria-label="mic"
              size="small"
              color="secondary"
              onClick={listen}
              style={{ color: "#ff4444" }}
            >
              <Mic />
            </IconButton>
          ) : (
            <FillIconButton aria-label="mic" size="small" onClick={stopListen}>
              <Mic />
            </FillIconButton>
          )}
          <StyledButton variant="outlined" onClick={resetTranscript}>
            Reset
          </StyledButton>
          <StyledButton variant="contained" onClick={savePost}>
            Publish
          </StyledButton>
        </ButtonContainer>
      </Container>
      
    </>
  );
};

export default CreatePost;
