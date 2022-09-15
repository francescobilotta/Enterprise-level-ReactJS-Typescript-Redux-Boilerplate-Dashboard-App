import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

import { RootState } from "../../app/store";
import { useAppSelector } from "../../hooks";

const style = {
  details: {
    alignItems: { md: "center", xs: "flex-start" },
    display: "flex",
    flexDirection: { md: "column-reverse" },
    flexWrap: "wrap",
    justifyContent: "space-between",
    p: 3,
  },
  overview: {
    alignItems: { md: "center", xs: "flex-start" },
    display: "flex",
    flexDirection: { md: "column-reverse" },
    flexWrap: "wrap",
    justifyContent: "space-between",
    p: 3,
  },
  productImage: {
    height: 48,
    mr: 1,
    width: 48,
  },
  root: {},
};

function Subscription() {
  const {
    profile: { subscription },
  } = useAppSelector((state: RootState) => state.profile);
  return (
    <Card>
      <CardHeader title="Manage your subscription" />
      <Divider />
      <CardContent>
        <Paper variant="outlined">
          <Box sx={{ ...style.overview }}>
            <div>
              <Typography color="textPrimary" display="inline" variant="h4">
                {subscription!.currency}
                {subscription!.price}
              </Typography>
              <Typography display="inline" variant="subtitle1">
                /mo
              </Typography>
            </div>
            <Box alignItems="center" display="flex">
              <Box
                alt="Product"
                component="img"
                src="/images/products/product_premium.svg"
                sx={{ ...style.productImage }}
              />
              <Typography color="textSecondary" variant="overline">
                {subscription!.name}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ ...style.details }}>
            <div>
              <Typography color="textPrimary" variant="body2">
                {`${subscription!.proposalsLeft} proposals left`}
              </Typography>
              <Typography color="textPrimary" variant="body2">
                {`${subscription!.templatesLeft} templates`}
              </Typography>
            </div>
            <div>
              <Typography color="textPrimary" variant="body2">
                {`${subscription!.invitesLeft} invites left`}
              </Typography>
              <Typography color="textPrimary" variant="body2">
                {`${subscription!.adsLeft} ads left`}
              </Typography>
            </div>
            <div>
              {subscription!.hasAnalytics && (
                <Typography color="textPrimary" variant="body2">
                  Analytics dashboard
                </Typography>
              )}
              {subscription!.hasEmailAlerts && (
                <Typography color="textPrimary" variant="body2">
                  Email alerts
                </Typography>
              )}
            </div>
          </Box>
        </Paper>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button color="secondary" size="small" variant="contained">
            Upgrade plan
          </Button>
        </Box>
        <Box mt={2}>
          <Typography color="textSecondary" variant="body2">
            The refunds don&apos;t work once you have the subscription, but you
            can always{" "}
            <Link color="secondary" component={RouterLink} to="#/">
              Cancel your subscription
            </Link>
            .
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Subscription;
