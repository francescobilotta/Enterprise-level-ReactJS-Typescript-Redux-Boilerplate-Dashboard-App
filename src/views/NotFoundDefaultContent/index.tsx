import { Typography } from "@mui/material";
import * as React from "react";

import { MainLayout } from "../../layouts";

function NotFoundDefaultContent() {
  return (
    <MainLayout title="Not Found">
      <Typography color="textPrimary" variant="h4">
        Not found default content
      </Typography>
    </MainLayout>
  );
}

export default NotFoundDefaultContent;
