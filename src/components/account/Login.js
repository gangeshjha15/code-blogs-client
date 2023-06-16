// Login.js
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Link,
  styled,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { API } from "../../service/api";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import { toast } from "react-toastify";
import { setUserAccount } from "../../store/accountSlice";

const StyledAvatar = styled(Avatar)`
  margin: 8px;
  background-color: #4F46E5;
`;

const StyledButton = styled(Button)`
    background: #4F46E5;
    &:hover {
    background: #4F46E5;
    }
`;
const StyledForm = styled("form")({
  width: "100%",
  marginTop: "20px",
  marginBottom: "20px"
});

const Login = ({ setIsUserAuth }) => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const valueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
        const res = await API.userLogin(login);
        console.log(res.status);
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
          } else{
              toast.error("Server Error! Try again later");
          }
          console.log(error);
          
      }
  };

  return (
    <div style={{ display: "flex", alignItems:'center', height: '110vh'}}>
      <Grid container component="main" justifyContent='center' >
        <Grid
          item
          xs={12}
          sm={8}
          md={4}
          component={Box}
          pl={4}
          pr={4}
          sx={{background: "#fff"}}
        >
          <Box display="flex" justifyContent="center">
            <StyledAvatar>
              <LockOutlinedIcon />
            </StyledAvatar>
          </Box>
          <Typography component="h1" variant="h5" align="center">
            Sign in
          </Typography>
          <StyledForm onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{background: "#fff"}}
              value={login.email}
              onChange={(e) => valueChange(e)}
            />
            <Grid item xs style={{float: 'right'}}>
                <Link component={RouterLink} to="/forget-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{marginBottom: "20px", background: "#fff"}}
              value={login.password}
              onChange={(e) => valueChange(e)}
            />
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign In
            </StyledButton>
            <Grid container>
              
              <Grid item style={{marginTop: '10px'}}>
                <span style={{color: 'grey'}}>Don't have an account?</span>
                <Link component={RouterLink} to="/signup" variant="body2">
                  {"Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </StyledForm>
        </Grid>
      </Grid>
    </div>
  );
}


export default Login;
