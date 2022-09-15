import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  SvgIcon,
  Theme,
  Typography,
} from "@mui/material";
import * as React from "react";
import {
  ChevronRight as ChevronRightIcon,
  PlusCircle as PlusCircleIcon,
} from "react-feather";
import { Link as RouterLink } from "react-router-dom";

const style = {
  action: {
    "& + &": {
      ml: 1,
    },
    mb: 1,
  },
  root: {
    justifyContent: "space-between",
    spacing: (theme: Theme) => theme.spacing(3),
  },
};

type Props = {
  onAddClick?: () => void;
};

function Header({ onAddClick = undefined }: Props) {
  return (
    <Grid container sx={{ ...style.root }}>
      <Grid item>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<ChevronRightIcon fontSize="small" />}
        >
          <Link
            color="inherit"
            component={RouterLink}
            to="/app"
            variant="body1"
          >
            Dashboard
          </Link>
          <Box>
            <Typography color="inherit" variant="body1">
              Calendar
            </Typography>
          </Box>
        </Breadcrumbs>
        <Typography color="textPrimary" variant="h4">
          Here&apos;s what you planned
        </Typography>
      </Grid>
      <Grid item>
        <Button
          color="primary"
          sx={{ ...style.action }}
          variant="contained"
          startIcon={
            <SvgIcon fontSize="small">
              <PlusCircleIcon />
            </SvgIcon>
          }
          onClick={onAddClick}
        >
          New Event
        </Button>
      </Grid>
    </Grid>
  );
}

export default Header;
