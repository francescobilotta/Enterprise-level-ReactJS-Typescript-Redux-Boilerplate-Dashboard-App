import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import * as React from "react";

function Notifications() {
  return (
    <form>
      <Card>
        <CardHeader title="Notifications" />
        <Divider />
        <CardContent>
          <Grid container spacing={6} wrap="wrap">
            <Grid item md={4} sm={6} xs={12}>
              <Typography gutterBottom color="textPrimary" variant="h6">
                System
              </Typography>
              <Typography gutterBottom color="textSecondary" variant="body2">
                You will receive emails in your business email address
              </Typography>
              <div>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Email alerts"
                />
              </div>
              <div>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Push Notifications"
                />
              </div>
              <div>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Text message"
                />
              </div>
              <div>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label={
                    <>
                      <Typography color="textPrimary" variant="body1">
                        Phone calls
                      </Typography>
                      <Typography variant="caption">
                        Short voice phone updating you
                      </Typography>
                    </>
                  }
                />
              </div>
            </Grid>

            <Grid item md={4} sm={6} xs={12}>
              <Typography gutterBottom color="textPrimary" variant="h6">
                Chat App
              </Typography>
              <Typography gutterBottom color="textSecondary" variant="body2">
                You will receive emails in your business email address
              </Typography>
              <div>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Email"
                />
              </div>
              <div>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Push notifications"
                />
              </div>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="secondary" type="submit" variant="contained">
            Save Settings
          </Button>
        </Box>
      </Card>
    </form>
  );
}
export default Notifications;
