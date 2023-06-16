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
import { toast } from "react-toastify";

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

const Signup = () => {
  const [signup, setSignup] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  

  const valueChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    try {
        const res = await API.userSignup(signup);
  
        if (res.isSuccess) {
          toast.success("Congratulations, your account has been created successfully!")
          setSignup({ name: "", email: "", password: "" });
          navigate('/login');
        }
      } catch (error) {
        if (error.code === 400) {
          toast.error("User with this email already exist!");
        } else {
          toast.error("Something went wrong! Try agin later");
        }
      }
  };

  return (
    <div style={{ display: "flex", alignItems:'center', height: '120vh'}}>
      <Grid container component="main" justifyContent="center">
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
            Sign up
          </Typography>
          <StyledForm onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={signup.name}
              sx={{background: "#fff"}}
              onChange={(e) => valueChange(e)}
            />
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
              value={signup.email}
              onChange={(e) => valueChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              sx={{marginBottom: "20px", background: "#fff"}}
              autoComplete="current-password"
              value={signup.password}
              onChange={(e) => valueChange(e)}
            />
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
            >
              Sign Up
            </StyledButton>
            <Grid container style={{marginTop: '10px'}}>
              <Grid item>
              <span style={{color: 'grey'}}>Already have an account?</span>
                <Link component={RouterLink} to="/login" variant="body2">
                  {"Sign In"}
                </Link>
              </Grid>
            </Grid>
          </StyledForm>
        </Grid>
      </Grid>
    </div>
  );
}


export default Signup;
