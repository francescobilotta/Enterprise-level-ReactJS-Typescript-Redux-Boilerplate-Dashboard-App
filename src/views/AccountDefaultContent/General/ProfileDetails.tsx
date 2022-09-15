import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  Typography,
} from "@mui/material";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

import { UserType } from "../../../models";

type Props = {
  user: UserType;
};

function ProfileDetails({ user }: Props) {
  return (
    <Card>
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
          textAlign="center"
        >
          <Avatar src={user?.avatar} sx={{ height: 100, width: 100 }} />
          <Typography
            gutterBottom
            color="textPrimary"
            sx={{ mt: 1 }}
            variant="h4"
          >
            {user?.name}
          </Typography>
          <Typography color="textPrimary" variant="body1">
            Your tier:{" "}
            <Link component={RouterLink} to="/pricing">
              {user?.tier}
            </Link>
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button fullWidth variant="text">
          Remove picture
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProfileDetails;
