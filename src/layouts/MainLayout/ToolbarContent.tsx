import { Button, Link, useMediaQuery } from "@mui/material";
import * as React from "react";

import { RootState } from "../../app/store";
import HeaderProfile from "../../components/HeaderProfile";
import { useAppSelector } from "../../hooks";

const style = {
  link: {
    color: "#000",
    textDecoration: "none",
  },
};

function ToolbarContent() {
  const { claims } = useAppSelector((state: RootState) => state.auth);
  const mobileDevice = useMediaQuery("(max-width:650px)");

  return (
    <>
      <Link
        href="/"
        style={{ textDecoration: "none" }}
        sx={{ ...style.link, flexGrow: 1 }}
      >
        {!mobileDevice && "LOGO"}
      </Link>
      <Button color="inherit">
        <Link href="/" sx={{ ...style.link }}>
          Home
        </Link>
      </Button>
      <Button color="inherit">
        <Link href="/about" sx={{ ...style.link }}>
          About
        </Link>
      </Button>

      {claims ? (
        <>
          <Button color="inherit">
            <Link href="/dashboard" sx={{ ...style.link }}>
              Dashboard
            </Link>
          </Button>
          <HeaderProfile />
        </>
      ) : (
        <Button color="inherit">
          <Link href="/login" sx={{ ...style.link }}>
            Login
          </Link>
        </Button>
      )}
    </>
  );
}

export default ToolbarContent;
