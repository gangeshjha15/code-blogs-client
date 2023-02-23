import { Grid, Box, Fab, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";

// Components
import Banner from "../banner/Banner";
import Posts from "./post/Posts";
import TestCategories from "./TestCategories";

const StyledFab = styled(Fab)`
  background: #c780fa;
  color: #fff;
  &:hover {
    background: #a459d1;
  }
`;

const TestHome = () => {
  return (
    <Box style={{ position: "relative" }}>
      <Banner />
      <Divider />
      <Box sx={{ width: "100%" }}>
        <TestCategories />
      </Box>
      <Box>
        <Grid
          container
          item
          lg={12}
          sm={12}
          xs={12}
          // style={{ background: "#F5EAEA" }}
        >
          <Posts />
        </Grid>
      </Box>
      <Link to={`/create`} style={{ textDecoration: "none" }}>
        <StyledFab
          color="primary"
          style={{ position: "fixed", bottom: "20px", right: "30px" }}
          variant="extended"
        >
          <AddIcon sx={{ mr: 1 }} />
          Create Blog
        </StyledFab>
      </Link>
    </Box>
  );
};

export default TestHome;
