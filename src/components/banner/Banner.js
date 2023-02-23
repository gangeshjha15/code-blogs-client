import React from 'react'
import { styled } from "@mui/material";
import imageFile from '../../blogger_logo.png';

// background: url(https://img.freepik.com/premium-photo/woman-works-office-blue-background-concept-workspace-working-computer-freelance-banner_164357-1144.jpg?w=2000) center/100% repeat-x;
const Image = styled("img")({
  width:"100vw",
  height:"50Vh",
  objectFit: "cover",
  display:"flex",
  alignItems: "center",
  flexDirection: "column",
  '@media (max-width: 600px)' : {
    objectFit: "fill",
    height:"40Vh",
  }

})



const Banner = () => {
  return (
    <Image src={imageFile}/>
  )
}

export default Banner