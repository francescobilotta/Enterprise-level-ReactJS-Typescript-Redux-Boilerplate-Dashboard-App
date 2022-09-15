import {
  Avatar,
  Box,
  Collapse,
  Divider,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
  useMediaQuery,
} from "@mui/material";
import * as React from "react";
import {
  Calendar as CalendarIcon,
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
  DollarSign as DollarSignIcon,
  FilePlus as FilePlusIcon,
  List as ListIcon,
  LogOut as LogOutIcon,
  PieChart as PieChartIcon,
  ShoppingCart as ShoppingCartIcon,
  User as UserIcon,
} from "react-feather";
import { Link as RouterLink } from "react-router-dom";

import { RootState } from "../../app/store";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getProfileAsync } from "../../slices/profile";
import { handleLogout } from "../../ui-kit/utils";

const style = {
  avatar: {
    cursor: "pointer",
    height: 64,
    width: 64,
  },
  link: {
    color: "#000",
    textDecoration: "none",
  },
  nested: {
    pl: 4,
  },
};

type Props = {
  open?: boolean;
};

function DrawerContent({ open = undefined }: Props) {
  const [openDrawerSection1, setOpenDrawerSection1] = React.useState(true);
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state: RootState) => state.profile);
  const { claims } = useAppSelector((state: RootState) => state.auth);
  const mobileDevice = useMediaQuery("(max-width:650px)");

  const handleClickDrawerSection1 = () => {
    setOpenDrawerSection1(!openDrawerSection1);
  };

  React.useEffect(() => {
    if (claims) {
      dispatch(getProfileAsync(claims.sub));
    }
  }, []);

  return (
    <>
      {profile.name && !mobileDevice && open && (
        <Box p={2}>
          <Box display="flex" justifyContent="center">
            <Avatar alt="User" src={profile.avatar} sx={{ ...style.avatar }} />
          </Box>
          <Box mt={2} textAlign="center">
            <Typography>{profile.name}</Typography>
            <Typography color="textSecondary" variant="body2">
              Your tier: {profile.tier}
            </Typography>
          </Box>
        </Box>
      )}
      <Divider />
      <List>
        {open ? (
          <ListSubheader sx={{ textAlign: "left" }}>Reports</ListSubheader>
        ) : undefined}
        <Link component={RouterLink} sx={{ ...style.link }} to="/dashboard">
          <ListItemButton>
            <ListItemIcon>
              <PieChartIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </Link>

        {open ? (
          <ListSubheader sx={{ textAlign: "left" }}>Applications</ListSubheader>
        ) : undefined}
        <Link component={RouterLink} sx={{ ...style.link }} to="/calendar">
          <ListItemButton>
            <ListItemIcon>
              <CalendarIcon />
            </ListItemIcon>
            <ListItemText primary="Calendar" />
          </ListItemButton>
        </Link>

        {open ? (
          <ListSubheader sx={{ textAlign: "left" }}>Management</ListSubheader>
        ) : undefined}
        <ListItemButton onClick={handleClickDrawerSection1}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
          {openDrawerSection1 ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </ListItemButton>

        {open && openDrawerSection1 ? (
          <Collapse unmountOnExit in={openDrawerSection1} timeout="auto">
            <List disablePadding component="div">
              <Link
                component={RouterLink}
                sx={{ ...style.link }}
                to="/dashboard/list-products"
              >
                <ListItemButton sx={{ ...style.nested }}>
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText primary="List Products" />
                </ListItemButton>
              </Link>
              <Link
                component={RouterLink}
                sx={{ ...style.link }}
                to="/dashboard/create-product"
              >
                <ListItemButton sx={{ ...style.nested }}>
                  <ListItemIcon>
                    <FilePlusIcon />
                  </ListItemIcon>
                  <ListItemText primary="Create Product" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
        ) : undefined}

        {open ? (
          <ListSubheader sx={{ textAlign: "left" }}>Account</ListSubheader>
        ) : undefined}

        <Link component={RouterLink} sx={{ ...style.link }} to="/account">
          <ListItemButton>
            <ListItemIcon>
              <UserIcon />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItemButton>
        </Link>

        <Link component={RouterLink} sx={{ ...style.link }} to="/pricing">
          <ListItemButton>
            <ListItemIcon>
              <DollarSignIcon />
            </ListItemIcon>
            <ListItemText primary="Pricing" />
          </ListItemButton>
        </Link>

        <Link component={RouterLink} sx={{ ...style.link }} to="/">
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogOutIcon />
            </ListItemIcon>
            <ListItemText primary="logout" />
          </ListItemButton>
        </Link>
      </List>
    </>
  );
}

export default DrawerContent;
