import { Box, Typography, useMediaQuery } from "@mui/material";
import * as React from "react";

import { MainLayout } from "../../layouts";

function HomeDefaultContent() {
  const mobileDevice = useMediaQuery("(max-width:650px)");

  return (
    <MainLayout title="Home">
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          height: "70vh",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Box sx={{ width: "60vw" }}>
          <Typography
            sx={{ fontWeight: "bold" }}
            variant={mobileDevice ? "h4" : "h1"}
          >
            Welcome!
          </Typography>
        </Box>
      </Box>
    </MainLayout>
  );
}

export default HomeDefaultContent;
