import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  SvgIcon,
  Typography,
} from "@mui/material";
import * as React from "react";
import {
  ChevronRight as ChevronRightIcon,
  Download as DownloadIcon,
  PlusCircle as PlusCircleIcon,
  Upload as UploadIcon,
} from "react-feather";
import { Link as RouterLink } from "react-router-dom";

const style = {
  action: {
    mb: 1,
    ml: 1,
  },
  root: {
    justifyContent: "space-between",
  },
};

type Props = {
  className?: string;
};

function Header({ className = undefined }: Props) {
  return (
    <Grid container className={className} spacing={3} sx={{ ...style.root }}>
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
          <Box>
            <Typography color="inherit" variant="body1">
              List Products
            </Typography>
          </Box>
        </Breadcrumbs>
        <Typography color="textPrimary" variant="h4">
          All Products
        </Typography>
        <Box mt={2}>
          <Button
            sx={{ ...style.action }}
            startIcon={
              <SvgIcon fontSize="small">
                <UploadIcon />
              </SvgIcon>
            }
          >
            Import
          </Button>
          <Button
            sx={{ ...style.action }}
            startIcon={
              <SvgIcon fontSize="small">
                <DownloadIcon />
              </SvgIcon>
            }
          >
            Export
          </Button>
        </Box>
      </Grid>
      <Grid item>
        <Button
          color="primary"
          component={RouterLink}
          sx={{ ...style.action }}
          to="/dashboard/create-product"
          variant="contained"
          startIcon={
            <SvgIcon fontSize="small">
              <PlusCircleIcon />
            </SvgIcon>
          }
        >
          New Product
        </Button>
      </Grid>
    </Grid>
  );
}

export default Header;
