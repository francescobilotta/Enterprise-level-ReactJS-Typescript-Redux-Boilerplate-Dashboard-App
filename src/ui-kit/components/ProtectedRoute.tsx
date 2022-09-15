/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import jwt_decode from "jwt-decode";
import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAppDispatch } from "../../hooks";
import { ClaimsType } from "../../models";
import { saveClaimsAction } from "../../slices/auth";

function ProtectedRoute() {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");

  if (!token) {
    localStorage.clear();
    return <Navigate to="/login" />;
  }

  const decoded: ClaimsType = jwt_decode(token);
  const expiresAt = decoded.exp * 1000;
  const dateNow = Date.now();
  const isValid = dateNow <= expiresAt;
  dispatch(saveClaimsAction(decoded));

  return isValid ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
