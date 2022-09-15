import { Typography } from "@mui/material";
import * as React from "react";

import { MainLayout } from "../../layouts";

function AboutDefaultContent() {
  return (
    <MainLayout title="About">
      <Typography color="textPrimary" variant="h4">
        About default content
      </Typography>
    </MainLayout>
  );
}

export default AboutDefaultContent;
