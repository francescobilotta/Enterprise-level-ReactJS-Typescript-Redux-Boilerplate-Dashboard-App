import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

function Header() {
  return (
    <div>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
      >
        <Link color="inherit" component={RouterLink} to="/app">
          Dashboard
        </Link>
        <Box>
          <Typography color="inherit" variant="body1">
            Account
          </Typography>
        </Box>
      </Breadcrumbs>
      <Typography color="textPrimary" variant="h4">
        Settings
      </Typography>
    </div>
  );
}

export default Header;
