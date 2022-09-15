import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { postProductAxios } from "../../api/services";
import FilesDropzone from "../../components/FilesDropzone";
import QuillEditor from "../../components/QuillEditor";
import { productDefaultValue, yupProductValidation } from "../../models";

const categories = [
  {
    id: "shirts",
    name: "Shirts",
  },
  {
    id: "phones",
    name: "Phones",
  },
  {
    id: "cars",
    name: "Cars",
  },
];

function ProductCreateForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = React.useState("");
  return (
    <Formik
      initialValues={productDefaultValue}
      validationSchema={yupProductValidation}
      onSubmit={async (values, formikHelpers) => {
        try {
          await postProductAxios(values);
          formikHelpers.setStatus({ success: true });
          formikHelpers.setSubmitting(false);
          enqueueSnackbar("Product Created", {
            variant: "success",
          });
          navigate("/dashboard/list-products");
        } catch (err: any) {
          enqueueSnackbar("Something happened. Please try again.", {
            variant: "error",
          });
          setError(err.message);
          formikHelpers.setStatus({ success: false });
          formikHelpers.setSubmitting(false);
        }
      }}
    >
      {(formikProps) => (
        <form onSubmit={formikProps.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item lg={8} xs={12}>
              <Card>
                <CardContent>
                  <TextField
                    fullWidth
                    label="Product Name"
                    name="name"
                    value={formikProps.values.name}
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
                  <Typography
                    color="textSecondary"
                    sx={{ mb: 1, mt: 3 }}
                    variant="subtitle2"
                  >
                    Description
                  </Typography>
                  <Paper variant="outlined">
                    <QuillEditor
                      value={formikProps.values.description}
                      onChange={(value: string) =>
                        formikProps.setFieldValue("description", value)
                      }
                    />
                  </Paper>
                  {formikProps.touched.description &&
                    formikProps.errors.description && (
                      <Box mt={2}>
                        <FormHelperText error>
                          {formikProps.errors.description}
                        </FormHelperText>
                      </Box>
                    )}
                </CardContent>
              </Card>
              <Box mt={3}>
                <Card>
                  <CardHeader title="Upload Images" />
                  <Divider />
                  <CardContent>
                    <FilesDropzone />
                  </CardContent>
                </Card>
              </Box>
              <Box mt={3}>
                <Card>
                  <CardHeader title="Prices" />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          label="Price"
                          name="price"
                          type="number"
                          value={formikProps.values.price}
                          variant="outlined"
                          error={Boolean(
                            formikProps.touched.price &&
                              formikProps.errors.price
                          )}
                          helperText={
                            formikProps.touched.price &&
                            formikProps.errors.price
                              ? formikProps.errors.price
                              : "If you have a sale price this will be shown as old price"
                          }
                          onBlur={formikProps.handleBlur}
                          onChange={formikProps.handleChange}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          label="Sale price"
                          name="salePrice"
                          type="number"
                          value={formikProps.values.salePrice}
                          variant="outlined"
                          error={Boolean(
                            formikProps.touched.salePrice &&
                              formikProps.errors.salePrice
                          )}
                          helperText={
                            formikProps.touched.salePrice &&
                            formikProps.errors.salePrice
                          }
                          onBlur={formikProps.handleBlur}
                          onChange={formikProps.handleChange}
                        />
                      </Grid>
                    </Grid>
                    <Box mt={2}>
                      <FormControlLabel
                        label="Product is taxable"
                        control={
                          <Checkbox
                            checked={formikProps.values.isTaxable}
                            name="isTaxable"
                            value={formikProps.values.isTaxable}
                            onChange={formikProps.handleChange}
                          />
                        }
                      />
                    </Box>
                    <Box mt={2}>
                      <FormControlLabel
                        label="Price includes taxes"
                        control={
                          <Checkbox
                            checked={formikProps.values.includesTaxes}
                            name="includesTaxes"
                            value={formikProps.values.includesTaxes}
                            onChange={formikProps.handleChange}
                          />
                        }
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Card>
                <CardHeader title="Organize" />
                <Divider />
                <CardContent>
                  <TextField
                    fullWidth
                    select
                    label="Category"
                    name="category"
                    SelectProps={{ native: true }}
                    value={formikProps.values.category}
                    variant="outlined"
                    onChange={formikProps.handleChange}
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    label="Product Code"
                    name="productCode"
                    sx={{ mt: 2 }}
                    value={formikProps.values.productCode}
                    variant="outlined"
                    error={Boolean(
                      formikProps.touched.productCode &&
                        formikProps.errors.productCode
                    )}
                    helperText={
                      formikProps.touched.productCode &&
                      formikProps.errors.productCode
                    }
                    onBlur={formikProps.handleBlur}
                    onChange={formikProps.handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Product Sku"
                    name="productSku"
                    sx={{ mt: 2 }}
                    value={formikProps.values.productSku}
                    variant="outlined"
                    error={Boolean(
                      formikProps.touched.productSku &&
                        formikProps.errors.productSku
                    )}
                    helperText={
                      formikProps.touched.productSku &&
                      formikProps.errors.productSku
                    }
                    onBlur={formikProps.handleBlur}
                    onChange={formikProps.handleChange}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          {error && (
            <Box mt={3}>
              <FormHelperText error>{error}</FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <Button
              color="primary"
              disabled={formikProps.isSubmitting}
              type="submit"
              variant="contained"
            >
              Create product
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default ProductCreateForm;
