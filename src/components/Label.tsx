import { alpha, Theme, Typography } from "@mui/material";
import * as React from "react";

const style = {
  error: {
    bgcolor: (theme: Theme) => alpha(theme.palette.error.main, 0.2),
    color: (theme: Theme) => theme.palette.error.main,
  },
  primary: {
    bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.2),
    color: (theme: Theme) => theme.palette.primary.main,
  },
  root: {
    alignItems: "center",
    borderRadius: 2,
    cursor: "default",
    display: "inline-flex",
    flexGrow: 0,
    flexShrink: 0,
    height: 20,
    justifyContent: "center",
    letterSpacing: 0.5,
    minWidth: 20,
    p: 0.5,
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },
  secondary: {
    bgcolor: (theme: Theme) => alpha(theme.palette.secondary.main, 0.2),
    color: (theme: Theme) => theme.palette.secondary.main,
  },
  success: {
    bgcolor: (theme: Theme) => alpha(theme.palette.success.main, 0.2),
    color: (theme: Theme) => theme.palette.success.main,
  },
  warning: {
    bgcolor: (theme: Theme) => alpha(theme.palette.warning.main, 0.2),
    color: (theme: Theme) => theme.palette.warning.main,
  },
};

type Props = {
  color?: "primary" | "secondary" | "error" | "warning" | "success";
  children?: React.ReactNode;
};

function Label({ color = "secondary", children = undefined }: Props) {
  return (
    <Typography sx={{ ...style.root, ...style[color] }} variant="body1">
      {children}
    </Typography>
  );
}

export default Label;
