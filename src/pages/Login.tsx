import { Box } from "@mui/material";
import * as React from "react";

type Props = {
  children?: React.ReactNode;
};

function Login({ children = undefined }: Props) {
  return <Box>{children}</Box>;
}

export default Login;
