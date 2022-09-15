import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import * as React from "react";
import * as Yup from "yup";

import { changePasswordAxios } from "../../api/services";
import { RootState } from "../../app/store";
import { useAppSelector } from "../../hooks";
import { ChangePasswordType, PasswordType } from "../../models";

function Security() {
  const { claims } = useAppSelector((state: RootState) => state.auth);
  const [error, setError] = React.useState("");
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={
        {
          password: "",
          passwordConfirm: "",
        } as PasswordType
      }
      validationSchema={Yup.object().shape({
        password: Yup.string()
          .min(7, "Must be at least 7 characters")
          .max(255)
          .required("Required"),
        passwordConfirm: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Required"),
      })}
      onSubmit={async (values, formikHelpers) => {
        if (claims) {
          try {
            if (values.password !== values.passwordConfirm) {
              enqueueSnackbar("The two passwords don't match", {
                variant: "warning",
              });
              return;
            }
            const args: ChangePasswordType = {
              email: claims.email,
              id: claims.sub,
              password: values.password,
            };
            await changePasswordAxios(args);
            formikHelpers.resetForm();
            formikHelpers.setStatus({ success: true });
            formikHelpers.setSubmitting(false);
            enqueueSnackbar("Password updated", {
              variant: "success",
            });
          } catch (err) {
            if (err instanceof Error) {
              setError(err.message);
            }
            enqueueSnackbar("Error happened", {
              variant: "error",
            });
            console.error(err);
            formikHelpers.setStatus({ success: false });
            formikHelpers.setSubmitting(false);
          }
        }
      }}
    >
      {(formikProps) => (
        <form onSubmit={formikProps.handleSubmit}>
          <Card>
            <CardHeader title="Change Password" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={4} sm={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={formikProps.values.password}
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
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Password Confirmation"
                    name="passwordConfirm"
                    type="password"
                    value={formikProps.values.passwordConfirm}
                    variant="outlined"
                    error={Boolean(
                      formikProps.touched.passwordConfirm &&
                        formikProps.errors.passwordConfirm
                    )}
                    helperText={
                      formikProps.touched.passwordConfirm &&
                      formikProps.errors.passwordConfirm
                    }
                    onBlur={formikProps.handleBlur}
                    onChange={formikProps.handleChange}
                  />
                </Grid>
              </Grid>
              {error && (
                <Box mt={3}>
                  <FormHelperText error>{error}</FormHelperText>
                </Box>
              )}
            </CardContent>
            <Divider />

            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button
                color="secondary"
                disabled={formikProps.isSubmitting}
                type="submit"
                variant="contained"
              >
                Change Password
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
}
export default Security;
