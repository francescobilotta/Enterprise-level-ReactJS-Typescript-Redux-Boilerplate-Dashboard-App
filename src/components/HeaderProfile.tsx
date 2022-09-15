import {
  Avatar,
  Box,
  Divider,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Theme,
} from "@mui/material";
import * as React from "react";
import { Hexagon as HexagonIcon, LogOut as LogOutIcon } from "react-feather";
import { Link as RouterLink } from "react-router-dom";

import { RootState } from "../app/store";
import { useAppSelector } from "../hooks";

const style = {
  avatar: {
    cursor: "pointer",
    height: 40,
    width: 40,
  },
  link: { color: "inherit", textDecoration: "none" },
  paper: {
    border: "1px solid #d3d4d5",
  },
  small: (theme: Theme) => ({
    height: theme.spacing(3),
    width: theme.spacing(3),
  }),
};

function HeaderProfile() {
  const { profile } = useAppSelector((state: RootState) => state.profile);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <div>
      <Box display="flex" justifyContent="center" onClick={handleClick}>
        <Avatar
          alt="User"
          src={profile.avatar}
          sx={{ ...style.avatar, ...style.small }}
        />
      </Box>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        elevation={0}
        id="customized-menu"
        open={Boolean(anchorEl)}
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        transformOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
        onClose={handleClose}
      >
        <MenuItem>
          <ListItemText primary={profile.email} />
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <HexagonIcon />
          </ListItemIcon>
          <ListItemText primary="Partners" />
        </MenuItem>
        <Link component={RouterLink} sx={{ ...style.link }} to="/">
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogOutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </Link>
      </Menu>
    </div>
  );
}

export default HeaderProfile;
