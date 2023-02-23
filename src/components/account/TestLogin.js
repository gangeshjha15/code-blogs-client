import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  styled,
  Tab,
  Tabs,
} from "@mui/material";
import { API } from "../../service/api";
import { useNavigate } from "react-router-dom";
import imageFile from "../../logo2.png";
import {useDispatch} from "react-redux";
import { toast } from "react-toastify";
import { setUserAccount } from "../../store/accountSlice";

// Adding styled
const Component = styled(Box)`
  width: 400px;
  margin: auto;
  margin-top: 120px;
  box-shadow: 2px 1px 2px 1px rgba(0 0 0/ 0.5);
`;

const Image = styled("img")({
  width: 150,
  margin: "auto",
  display: "flex",
  padding: "50px 0 10px 0",
});

const LoginWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 25px 35px;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;
const SignupWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 25px 35px;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  background: #fb641b;
  text-transform: none;
`;
const SignupButton = styled(Button)`
  background: #fb641b;
  text-transform: none;
`;

// const Error = styled(Typography)`
//   font-size: 10px;
//   color: #ff6161;
//   line-height: 0px;
//   margin-top: 10px;
//   font-weight: 600;
// `;

const Login = ({ setIsUserAuth }) => {
  const [signup, setSignup] = useState({ name: "", email: "", password: "" });
  const [login, setLogin] = useState({ email: "", password: "" });
  // const [error, setError] = useState("");
  const [value, setValue] = useState(0);

  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();


  const inputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const valueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    try {
      const res = await API.userSignup(signup);

      if (res.isSuccess) {
        toast.success("Congratulations, your account has been created successfully!")
        // setError("");
        setSignup({ name: "", email: "", password: "" });
        setValue(0);
      }
    } catch (error) {
      if (error.code === 400) {
        toast.error("User with this email already exist!");
        // setError("User with this email already exist!");
      } else {
        toast.error("Something went wrong! Try agin later");
        // setError("Something went wrong! Try agin later");
      }
      console.log(error);
      console.log(error.code);
    }
  };

  const loginUser = async () => {
    try {
      const res = await API.userLogin(login);

      if (res.isSuccess) {
        toast.success("User login successfully!")
        // setError("");

        sessionStorage.setItem("accessToken", `Bearer ${res.data.accessToken}`);
        sessionStorage.setItem(
          "refreshToken",
          `Bearer ${res.data.refreshToken}`
        );
        
        dispatch(setUserAccount({
          name: res.data.name,
          email: res.data.email,
          id: res.data.id,
        }))

        //mark user authentication to true
        setIsUserAuth(true);
        navigate("/");
      } 
    } catch (error) {
        if(error.code === 400){
            toast.error("Email or Password doesn't match!");
            // setError("Email or Password doesn't match!");
        } else{
            toast.error("Server Error! Try again later");
            // setError("Server Error! Try again later");
        }
        console.log(error);
        
    }
  };

  return (
    <Component>
      <Box>
        <Image src={imageFile} alt="login" />
        <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Login" />
            <Tab label="Signup" />
          </Tabs>
        </Box>

        {value === 0 ? (
          <LoginWrapper>
            
            <TextField
              required
              variant="standard"
              type="email"
              onChange={(e) => valueChange(e)}
              name="email"
              label="Email"
            />
            <TextField
              required
              variant="standard"
              type="password"
              onChange={(e) => valueChange(e)}
              name="password"
              label="Password"
            />

            {/* {error && <Error>{error}</Error>} */}

            <LoginButton variant="contained" onClick={loginUser}>
              Login
            </LoginButton>
          </LoginWrapper>
        ) : (
          <SignupWrapper>
            <TextField
              required
              variant="standard"
              type="text"
              name="name"
              onChange={inputChange}
              label="Name"
            />
            <TextField
              required
              variant="standard"
              type="email"
              name="email"
              onChange={inputChange}
              label="Email"
            />
            <TextField
              required
              variant="standard"
              type="password"
              name="password"
              onChange={inputChange}
              label="Password"
            />

            {/* {error && <Error>{error}</Error>} */}

            <SignupButton onClick={signupUser} variant="contained">
              Signup
            </SignupButton>
          </SignupWrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
