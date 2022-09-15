import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import * as React from "react";

import { useAppDispatch } from "../../../hooks";
import { UserType, yupUserValidation } from "../../../models";
import { putProfileAsync } from "../../../slices/profile";
import { countries } from "../../../ui-kit/constants/countries";

type Props = {
  user: UserType;
};
function GeneralSettings({ user }: Props) {
  const dispatch = useAppDispatch();
  const [error, setError] = React.useState("");
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Formik
      enableReinitialize
      initialValues={user}
      validationSchema={yupUserValidation}
      onSubmit={async (values, formikHelpers) => {
        try {
          dispatch(putProfileAsync(values));
          formikHelpers.setStatus({ success: true });
          formikHelpers.setSubmitting(false);
          enqueueSnackbar("Profile updated", {
            variant: "success",
          });
        } catch (err) {
          if (err instanceof Error) {
            console.error(err);
            setError(err.message);
          }
          formikHelpers.setStatus({ success: false });
          formikHelpers.setSubmitting(false);
        }
      }}
    >
      {(formikProps) => (
        <form onSubmit={formikProps.handleSubmit}>
          <Card>
            <CardHeader title="Profile" />
            <Divider />
            <CardContent>
              <Grid container spacing={4}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formikProps.values?.name}
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
                    required
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formikProps.values?.email}
                    variant="outlined"
                    error={Boolean(
                      formikProps.touched.email && formikProps.errors.email
                    )}
                    helperText={
                      formikProps.touched.email && formikProps.errors.email
                        ? formikProps.errors.email
                        : "We will use this email to contact you"
                    }
                    onBlur={formikProps.handleBlur}
                    onChange={formikProps.handleChange}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formikProps.values?.phone}
                    variant="outlined"
                    error={Boolean(
                      formikProps.touched.phone && formikProps.errors.phone
                    )}
                    helperText={
                      formikProps.touched.phone && formikProps.errors.phone
                    }
                    onBlur={formikProps.handleBlur}
                    onChange={formikProps.handleChange}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Autocomplete
                    getOptionLabel={(option) => option.text}
                    id="country"
                    options={countries}
                    value={formikProps.values?.country}
                    isOptionEqualToValue={(option, value) =>
                      option.text === value.text
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Country"
                        name="country"
                        value={formikProps.values?.country}
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "country",
                        }}
                        onChange={formikProps.handleChange}
                      />
                    )}
                    renderOption={(props, option) => {
                      return (
                        <li key={option.text} {...props}>
                          {option.text}
                        </li>
                      );
                    }}
                    onChange={(e: any, value) => {
                      if (value) {
                        formikProps.setFieldValue("country", value);
                      }
                    }}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="State/Region"
                    name="state"
                    value={formikProps.values?.state}
                    variant="outlined"
                    error={Boolean(
                      formikProps.touched.state && formikProps.errors.state
                    )}
                    helperText={
                      formikProps.touched.state && formikProps.errors.state
                    }
                    onBlur={formikProps.handleBlur}
                    onChange={formikProps.handleChange}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={formikProps.values?.city}
                    variant="outlined"
                    error={Boolean(
                      formikProps.touched.city && formikProps.errors.city
                    )}
                    helperText={
                      formikProps.touched.city && formikProps.errors.city
                    }
                    onBlur={formikProps.handleBlur}
                    onChange={formikProps.handleChange}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Typography color="textPrimary" variant="h6">
                    Make Contact Info Public
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Means that anyone viewing your profile will be able to see
                    your contacts details
                  </Typography>
                  <Switch
                    checked={formikProps.values?.isPublic}
                    edge="start"
                    name="isPublic"
                    onChange={formikProps.handleChange}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Typography color="textPrimary" variant="h6">
                    Available to hire
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Toggling this will let your teammates know that you are
                    available for acquiring new projects
                  </Typography>
                  <Switch
                    checked={formikProps.values?.canHire}
                    edge="start"
                    name="canHire"
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
                Save Changes
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
}

export default GeneralSettings;
