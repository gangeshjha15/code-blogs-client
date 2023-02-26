import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API } from "../../service/api";
import { toast } from "react-toastify";

const StyledForm = styled("form")({
  width: "100%",
  marginTop: "20px",
  marginBottom: "20px",
});

export const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [cnfPassword, setCnfPassword] = useState();
  const [details, setDetails] = useState({
    email: "",
    otpcode: "",
    password: "",
  });
  const [isChangePass, setIsChangePass] = useState(false);
  const [minutes, setMinutes] = useState(4);
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const resendOTP = async() => {
    setMinutes(4);
    setSeconds(59);
    try {
      let res = await API.emailSend({ email });
      console.log(res.status);
      if (res.isSuccess) {
        toast.success("OTP has been sent to your Email Id!");
        setIsChangePass(true);
      }
    } catch (error) {
      if (error.code === 400) {
        toast.warning("This Email is not registered with us!");
      } else {
        toast.error("Internal server error");
      }
    }
  };


  // const [error, setError] = useState("");
  const navigate = useNavigate();

  const valueChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleCnfPassword = (e) => {
    // if(e.target.value != details.password){
    //     setError('Confirm password doesn\'t match with password');
    // } else{
    // setError('');
    // setCnfPassword(e.target.value);
    // }
    setCnfPassword(e.target.value);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      let res = await API.emailSend({ email });
      console.log(res.status);
      if (res.isSuccess) {
        toast.success("OTP has been sent to your Email Id!");
        setIsChangePass(true);
      }
    } catch (error) {
      if (error.code === 400) {
        toast.warning("This Email is not registered with us!");
      } else {
        toast.error("Internal server error");
      }
    }
  };

  const handleChangePass = async (e) => {
    e.preventDefault();
    details.email = email;
    try {
      let res = await API.changePassword(details);
      if (res.isSuccess) {
        toast.success("Password has been changed successfully!");
        navigate("/login");
      }
    } catch (error) {
      if (error.code === 404) {
        toast.error("Invalid OTP!");
      } else if (error.code === 403) {
        toast.warning("Token is Expired!");
      } else {
        toast.error("Internal server error");
      }
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", height: "110vh" }}>
      {!isChangePass ? (
        <Grid container component="main" justifyContent="center">
          <Grid
            item xs={12} sm={8} md={5} component={Box}mt={8} mb={8} pl={12} pr={12} pt={4} pb={4} boxShadow={3}
            sx={{ background: "#F5EAEA", borderRadius: "5px" }}
          >
            <Typography component="h1" variant="h5" align="center">
              Reset Password
            </Typography>
            <StyledForm onSubmit={handleSendOTP}>
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
                sx={{ background: "#fff", mb: "15px" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mr: "20px" }}
              >
                Send OTP
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => navigate("/login")}
              >
                Back
              </Button>
            </StyledForm>
          </Grid>
        </Grid>
      ) : (
        <Grid container component="main" justifyContent="center">
          <Grid item xs={12} sm={8} md={5} component={Box}mt={8} mb={8} pl={12} pr={12} pt={4} pb={4} boxShadow={3}
            sx={{ background: "#F5EAEA", borderRadius: "5px" }}
          >
            <Typography component="h1" variant="h5" align="center">
              Reset Password
            </Typography>
            <StyledForm onSubmit={handleChangePass}>
              <div style={{display: "flex"}}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  autoFocus
                  id="otpcode"
                  label="OTP Code"
                  name="otpcode"
                  autoComplete="otpcode"
                  sx={{ background: "#fff" }}
                  value={details.otpcode}
                  onChange={(e) => valueChange(e)}
                />
                <div style={{margin: "auto"}}>
                  {seconds > 0 || minutes > 0 ? (
                    <Typography sx={{color: "#04aa6d"}}>
                      {minutes < 10 ? `0${minutes}` : minutes}:
                      {seconds < 10 ? `0${seconds}` : seconds}
                    </Typography>
                  ) : (
                    <Typography sx={{color: "#635985"}}>{minutes < 10 ? `0${minutes}` : minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}</Typography>
                  )}

                </div>

              </div>
              <Button
                  variant="contained"
                  disabled={seconds > 0 || minutes > 0}
                  style={{
                    background: seconds > 0 || minutes > 0 ? "#e7e9eb" : "#04aa6d",
                    color: "#fff",
                  }}
                  onClick={resendOTP}
                >
                  Resend OTP
              </Button>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="password"
                sx={{ background: "#fff" }}
                value={details.password}
                onChange={(e) => valueChange(e)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="cnfpassword"
                label="Confirm Password"
                name="cnfpassword"
                type="password"
                autoComplete="cnfpassword"
                sx={{ background: "#fff" }}
                value={cnfPassword}
                onChange={(e) => handleCnfPassword(e)}
              />
              {/* <Typography color="red">{error}</Typography> */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mr: "20px" }}
              >
                Change Password
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Back
              </Button>
            </StyledForm>
          </Grid>
        </Grid>
      )}
    </div>
  );
};
