import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Theme,
  Typography,
} from "@mui/material";
import * as React from "react";

import { MainLayout } from "../../layouts";

const style = {
  chooseButton: {
    backgroundColor: (theme: Theme) => theme.palette.common.white,
    color: (theme: Theme) => theme.palette.common.black,
  },
  product: {
    "&:hover": {
      transform: "scale(1.1)",
    },
    cursor: "pointer",
    padding: (theme: Theme) => theme.spacing(5, 3),
    position: "relative",
    textAlign: "left",
    transition: (theme: Theme) =>
      theme.transitions.create("transform", {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.sharp,
      }),
  },
  productImage: {
    borderRadius: (theme: Theme) => theme.shape.borderRadius,
    fontSize: 24,
    height: 48,
    left: (theme: Theme) => theme.spacing(3),
    position: "absolute",
    top: -24,
    width: 48,
  },
  recommendedProduct: {
    backgroundColor: (theme: Theme) => theme.palette.primary.main,
    color: (theme: Theme) => theme.palette.common.white,
  },
  root: {
    height: "100%",
    minHeight: "100%",
    pb: 15,
    pt: 15,
  },
};

function PricingDefaultContent() {
  return (
    <MainLayout sx={{ ...style.root }} title="Pricing">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography align="center" color="textPrimary" variant="h3">
            Start Selling!
          </Typography>
          <Box mt={1}>
            <Typography
              align="center"
              color="textSecondary"
              variant="subtitle1"
            >
              Welcome to the best platform for selling products
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            <Grid item md={4} xs={12}>
              <Paper elevation={5} sx={{ ...style.product }}>
                <Box
                  alt="Product"
                  component="img"
                  src="images/products/product_standard.svg"
                  sx={{ ...style.productImage }}
                />
                <Typography
                  gutterBottom
                  color="textSecondary"
                  component="h4"
                  variant="overline"
                >
                  Standard
                </Typography>
                <div>
                  <Typography
                    color="textPrimary"
                    component="span"
                    display="inline"
                    variant="h4"
                  >
                    $5
                  </Typography>
                  <Typography
                    color="textSecondary"
                    component="span"
                    display="inline"
                    variant="subtitle2"
                  >
                    /month
                  </Typography>
                </div>
                <Typography color="textSecondary" variant="overline">
                  Max 1 user
                </Typography>
                <Box my={2}>
                  <Divider />
                </Box>
                <Typography color="textPrimary" variant="body2">
                  20 proposals/month
                  <br />
                  10 templates
                  <br />
                  Analytics dashboard
                  <br />
                  Email alerts
                </Typography>
                <Box my={2}>
                  <Divider />
                </Box>
                <Button
                  fullWidth
                  sx={{ ...style.chooseButton }}
                  variant="contained"
                >
                  Choose
                </Button>
              </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper
                elevation={5}
                sx={{ ...style.product, ...style.recommendedProduct }}
              >
                <Box
                  alt="Product"
                  component="img"
                  src="images/products/product_premium--outlined.svg"
                  sx={{ ...style.productImage }}
                />
                <Typography
                  gutterBottom
                  color="inherit"
                  component="h4"
                  variant="overline"
                >
                  Premium
                </Typography>
                <div>
                  <Typography
                    color="inherit"
                    component="span"
                    display="inline"
                    variant="h4"
                  >
                    $29
                  </Typography>
                  <Typography
                    color="inherit"
                    component="span"
                    display="inline"
                    variant="subtitle2"
                  >
                    /month
                  </Typography>
                </div>
                <Typography color="inherit" variant="overline">
                  Max 3 user
                </Typography>
                <Box my={2}>
                  <Divider />
                </Box>
                <Typography color="inherit" variant="body2">
                  20 proposals/month
                  <br />
                  10 templates
                  <br />
                  Analytics dashboard
                  <br />
                  Email alerts
                </Typography>
                <Box my={2}>
                  <Divider />
                </Box>
                <Button
                  fullWidth
                  sx={{ ...style.chooseButton }}
                  variant="outlined"
                >
                  Choose
                </Button>
              </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper elevation={5} sx={{ ...style.product }}>
                <Box
                  alt="Product"
                  component="img"
                  src="images/products/product_extended.svg"
                  sx={{ ...style.productImage }}
                />
                <Typography
                  gutterBottom
                  color="textSecondary"
                  component="h4"
                  variant="overline"
                >
                  Extended
                </Typography>
                <div>
                  <Typography
                    color="textPrimary"
                    component="span"
                    display="inline"
                    variant="h4"
                  >
                    $259
                  </Typography>
                  <Typography
                    color="textSecondary"
                    component="span"
                    display="inline"
                    variant="subtitle2"
                  >
                    /month
                  </Typography>
                </div>
                <Typography color="textSecondary" variant="overline">
                  Unlimited
                </Typography>
                <Box my={2}>
                  <Divider />
                </Box>
                <Typography color="textPrimary" variant="body2">
                  All from above
                  <br />
                  Unlimited 24/7 support
                  <br />
                  Personalised Page
                  <br />
                  Advertise your profile
                </Typography>
                <Box my={2}>
                  <Divider />
                </Box>
                <Button
                  fullWidth
                  sx={{ ...style.chooseButton }}
                  variant="contained"
                >
                  Choose
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainLayout>
  );
}

export default PricingDefaultContent;
