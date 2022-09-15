import { Box, Button, Container, Divider, Typography } from "@mui/material";
import * as React from "react";

import { LoginForm, RegisterForm } from "../../components";
import { MainLayout } from "../../layouts";

function LoginDefaultContent() {
  const [isLogin, setIsLogin] = React.useState(true);

  return (
    <MainLayout title="Login">
      <Typography color="textPrimary" variant="h4">
        Login default content
      </Typography>
      <Container>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          my={5}
        >
          {isLogin ? <LoginForm /> : <RegisterForm />}
          <Divider />
          <Box mt={5}>
            Go to{" "}
            {isLogin ? (
              <Button
                color="primary"
                size="small"
                variant="text"
                onClick={() => setIsLogin(false)}
              >
                Register Form
              </Button>
            ) : (
              <Button
                color="primary"
                size="small"
                variant="text"
                onClick={() => setIsLogin(true)}
              >
                Login Form
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
}

export default LoginDefaultContent;
