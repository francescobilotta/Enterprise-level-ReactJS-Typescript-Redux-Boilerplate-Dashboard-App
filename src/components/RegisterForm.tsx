import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  CircularProgress,
  Divider,
  FormHelperText,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import jwt_decode from "jwt-decode";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { registerAxios } from "../api/services";
import { useAppDispatch } from "../hooks";
import {
  ClaimsType,
  registrationDefaultValue,
  yupRegistrationValidation,
} from "../models";
import { saveClaimsAction, saveTokenAction } from "../slices/auth";

function RegisterForm() {
  const key = "token";
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = React.useState("");
  const [isAlertVisible, setAlertVisible] = React.useState(false);

  const saveUserAuthDetails = (data: { accessToken: string }) => {
    localStorage.setItem(key, data.accessToken);
    const claims: ClaimsType = jwt_decode(data.accessToken);
    console.log("Claims::", claims);
    dispatch(saveTokenAction(data.accessToken));
    dispatch(saveClaimsAction(claims));
  };

  return (
    <Formik
      initialValues={registrationDefaultValue}
      validationSchema={yupRegistrationValidation}
      onSubmit={async (values, formikHelpers) => {
        try {
          const { data } = await registerAxios(values);
          saveUserAuthDetails(data);
          formikHelpers.resetForm();
          formikHelpers.setStatus({ success: true });
          formikHelpers.setSubmitting(false);
          navigate("dashboard");
        } catch (e) {
          setError("Failed. Please try again.");
          if (e instanceof Error) {
            console.log(e.message);
          }
          setAlertVisible(true);
          formikHelpers.setStatus({ success: false });
          formikHelpers.setSubmitting(false);
        }
      }}
    >
      {(formikProps) => (
        <Card>
          <CardHeader title="Register Form" />
          <Divider />
          <CardContent>
            {isAlertVisible && (
              <Box mb={3}>
                <Alert severity="info" onClose={() => setAlertVisible(false)}>
                  {error}!
                </Alert>
              </Box>
            )}
            {formikProps.isSubmitting ? (
              <Box display="flex" justifyContent="center" my={5}>
                <CircularProgress />
              </Box>
            ) : (
              <Box>
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={formikProps.touched.name}
                      variant="outlined"
                      error={Boolean(
                        formikProps.touched.name && formikProps.errors.name
                      )}
                      helperText={
                        formikProps.touched.name && formikProps.errors.name
                      }
                      onBlur={formikProps.handleBlur}
                      onChange={formikProps.handleChange}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Mobile"
                      name="mobile"
                      value={formikProps.touched.mobile}
                      variant="outlined"
                      error={Boolean(
                        formikProps.touched.mobile && formikProps.errors.mobile
                      )}
                      helperText={
                        formikProps.touched.mobile && formikProps.errors.mobile
                      }
                      onBlur={formikProps.handleBlur}
                      onChange={formikProps.handleChange}
                    />
                  </Grid>
                </Grid>
                <Box mt={2}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formikProps.touched.email}
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
                </Box>
                <Box mt={2}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={formikProps.touched.password}
                    variant="outlined"
                    error={Boolean(
                      formikProps.touched.password &&
                        formikProps.errors.password
                    )}
                    helperText={
                      formikProps.touched.password &&
                      formikProps.errors.password
                    }
                    onBlur={formikProps.handleBlur}
                    onChange={formikProps.handleChange}
                  />
                </Box>
                <Box alignItems="center" display="flex" ml={-1} mt={2}>
                  <Checkbox
                    checked={formikProps.touched.policy}
                    name="policy"
                    onChange={formikProps.handleChange}
                  />
                  <Typography color="textSecondary" variant="body2">
                    I have read the{" "}
                    <Link color="secondary" component="a" href="#/">
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(
                  formikProps.touched.policy && formikProps.errors.policy
                ) && (
                  <FormHelperText error>
                    {formikProps.errors.policy}
                  </FormHelperText>
                )}
                <form onSubmit={formikProps.handleSubmit}>
                  <Button
                    fullWidth
                    color="primary"
                    disabled={formikProps.isSubmitting}
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up
                  </Button>
                </form>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Formik>
  );
}

export default RegisterForm;
