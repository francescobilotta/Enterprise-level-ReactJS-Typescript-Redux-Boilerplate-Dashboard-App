import { Breadcrumbs, Button, Grid, Link, Typography } from "@mui/material";
import * as React from "react";
import { ChevronRight as ChevronRightIcon } from "react-feather";
import { Link as RouterLink } from "react-router-dom";

const style = {
  root: {
    justifyContent: "space-between",
  },
};

function Header() {
  return (
    <Grid container spacing={3} sx={{ ...style.root }}>
      <Grid item>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<ChevronRightIcon fontSize="small" />}
        >
          <Link
            color="inherit"
            component={RouterLink}
            to="/dashboard"
            variant="body1"
          >
            Dashboard
          </Link>
          <Typography color="inherit" variant="body1">
            Create Product
          </Typography>
        </Breadcrumbs>
        <Typography color="textPrimary" variant="h4">
          Create a new product
        </Typography>
      </Grid>
      <Grid item>
        <Button component={RouterLink} to="/dashboard/list-products">
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
}

export default Header;
