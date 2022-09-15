import {
  Alert,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  FormHelperText,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import jwt_decode from "jwt-decode";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { loginAxios } from "../api/services";
import { useAppDispatch } from "../hooks";
import { ClaimsType, userDefaultValue, yupLoginValidation } from "../models";
import { saveClaimsAction, saveTokenAction } from "../slices/auth";

function LoginForm() {
  const key = "token";
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = React.useState("");

  const saveUserAuthDetails = (data: { accessToken: string }) => {
    localStorage.setItem(key, data.accessToken);
    const claims: ClaimsType = jwt_decode(data.accessToken);
    console.log("Claims::", claims);
    dispatch(saveTokenAction(data.accessToken));
    dispatch(saveClaimsAction(claims));
  };

  return (
    <Formik
      initialValues={userDefaultValue}
      validationSchema={yupLoginValidation}
      onSubmit={async (values, formikHelpers) => {
        try {
          const { data } = await loginAxios(values);
          saveUserAuthDetails(data);
          formikHelpers.resetForm();
          formikHelpers.setStatus({ success: true });
          formikHelpers.setSubmitting(false);
          navigate("/dashboard");
        } catch (e) {
          setError("Failed. Please try again.");
          if (e instanceof Error) {
            console.log(e.message);
          }
          formikHelpers.setStatus({ success: false });
          formikHelpers.setSubmitting(false);
        }
      }}
    >
      {(formikProps) => (
        <Card>
          <form noValidate onSubmit={formikProps.handleSubmit}>
            <CardHeader title="Login" />
            <Divider />
            <Box m={2}>
              <TextField
                autoFocus
                fullWidth
                label="Email Address"
                margin="normal"
                name="email"
                type="email"
                value={formikProps.values.email}
                variant="outlined"
                error={Boolean(
                  formikProps.touched.email && formikProps.errors.email
                )}
                helperText={
                  formikProps.touched.email && formikProps.errors.email
                }
                onBlur={formikProps.handleBlur}
                onChange={formikProps.handleChange}
              />
              <TextField
                fullWidth
                label="Password"
                margin="normal"
                name="password"
                type="password"
                value={formikProps.values.password}
                variant="outlined"
                error={Boolean(
                  formikProps.touched.password && formikProps.errors.password
                )}
                helperText={
                  formikProps.touched.password && formikProps.errors.password
                }
                onBlur={formikProps.handleBlur}
                onChange={formikProps.handleChange}
              />

              <Box mt={2}>
                <Button
                  fullWidth
                  color="primary"
                  disabled={formikProps.isSubmitting}
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Log In
                </Button>
              </Box>
              {error && (
                <Box mt={3}>
                  <FormHelperText error>{error}</FormHelperText>
                </Box>
              )}
              <Box mt={2}>
                <Alert severity="info">
                  <div>
                    Use <b>demo@acme.io</b> and password <b>Pass123!</b>
                  </div>
                </Alert>
              </Box>
            </Box>
          </form>
        </Card>
      )}
    </Formik>
  );
}

export default LoginForm;
