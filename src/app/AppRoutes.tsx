import { LinearProgress } from "@mui/material";
import React, { Suspense } from "react";
import { /* Navigate, */ Route, Routes } from "react-router-dom";

import { About, Calendar, Dashboard, Home, Login, NotFound } from "../pages";
import Account from "../pages/Account";
import Pricing from "../pages/Pricing";
import { ProtectedRoute } from "../ui-kit/components";
import {
  AboutDefaultContent,
  DashboardDefaultContent,
  HomeDefaultContent,
  NotFoundDefaultContent,
  ProductCreateView,
  ProductListView,
} from "../views";

const CalendarDefaultContent = React.lazy(
  () => import("../views/CalendarDefaultContent")
);
const AccountDefaultContent = React.lazy(
  () => import("../views/AccountDefaultContent")
);
const PricingDefaultContent = React.lazy(
  () => import("../views/PricingDefaultContent")
);
const LoginDefaultContent = React.lazy(
  () => import("../views/LoginDefaultContent")
);

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home>
            <HomeDefaultContent />
          </Home>
        }
      />
      <Route
        path="/about"
        element={
          <About>
            <AboutDefaultContent />
          </About>
        }
      />
      <Route element={<ProtectedRoute />} path="/dashboard">
        <Route
          path=""
          element={
            <Dashboard>
              <Suspense
                fallback={<LinearProgress style={{ margin: "10rem" }} />}
              >
                <DashboardDefaultContent />
              </Suspense>
            </Dashboard>
          }
        />
        <Route
          path="list-products"
          element={
            <Dashboard>
              <Suspense
                fallback={<LinearProgress style={{ margin: "10rem" }} />}
              >
                <ProductListView />
              </Suspense>
            </Dashboard>
          }
        />
        <Route
          path="create-product"
          element={
            <Dashboard>
              <Suspense
                fallback={<LinearProgress style={{ margin: "10rem" }} />}
              >
                <ProductCreateView />
              </Suspense>
            </Dashboard>
          }
        />
      </Route>
      <Route
        path="/calendar"
        element={
          <Calendar>
            <Suspense fallback={<LinearProgress style={{ margin: "10rem" }} />}>
              <CalendarDefaultContent />
            </Suspense>
          </Calendar>
        }
      />
      <Route
        path="/login"
        element={
          <Login>
            <Suspense fallback={<LinearProgress style={{ margin: "10rem" }} />}>
              <LoginDefaultContent />
            </Suspense>
          </Login>
        }
      />
      <Route
        path="/pricing"
        element={
          <Pricing>
            <Suspense fallback={<LinearProgress style={{ margin: "10rem" }} />}>
              <PricingDefaultContent />
            </Suspense>
          </Pricing>
        }
      />
      <Route
        path="/account"
        element={
          <Account>
            <Suspense fallback={<LinearProgress style={{ margin: "10rem" }} />}>
              <AccountDefaultContent />
            </Suspense>
          </Account>
        }
      />
      <Route
        path="/not-found"
        element={
          <NotFound>
            <NotFoundDefaultContent />
          </NotFound>
        }
      />
      {/* <Route element={<Navigate to="not-found" />} path="*" /> */}
    </Routes>
  );
}

export default AppRoutes;
