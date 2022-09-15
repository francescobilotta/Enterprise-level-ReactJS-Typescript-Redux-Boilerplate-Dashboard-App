import { Box, Container, Divider, Tab, Tabs } from "@mui/material";
import * as React from "react";

import { tabs } from "../../constants/tabs";
import { MainLayout } from "../../layouts";
import General from "./General";
import Header from "./Header";
import Notifications from "./Notifications";
import Security from "./Security";
import Subscription from "./Subscription";

function AccountDefaultContent() {
  const [currentTab, setCurrentTab] = React.useState("general");
  const handleTabsChange = (
    event: React.ChangeEvent<{}>,
    value: string
  ): void => {
    setCurrentTab(value);
  };
  return (
    <MainLayout title="Account">
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          {/* handleTabsChange - for the clicking and selection of tabs */}
          <Tabs
            scrollButtons="auto"
            textColor="secondary"
            value={currentTab}
            variant="scrollable"
            onChange={handleTabsChange}
          >
            {/* we're going to iterate or loop on the tabs here */}
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box mt={3}>
          {/* current tab by default is the General component. The rest is not displayed until clicked or selected */}
          {currentTab === "general" && <General />}
          {currentTab === "subscription" && <Subscription />}
          {currentTab === "notifications" && <Notifications />}
          {currentTab === "security" && <Security />}
        </Box>
      </Container>
    </MainLayout>
  );
}

export default AccountDefaultContent;
