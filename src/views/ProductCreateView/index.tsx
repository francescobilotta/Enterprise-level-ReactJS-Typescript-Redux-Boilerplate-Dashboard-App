import { Container } from "@mui/material";
import * as React from "react";

import { MainLayout } from "../../layouts";
import Header from "./Header";
import ProductCreateForm from "./ProductCreateForm";

const style = {
  root: {
    minHeight: "100%",
    pb: 12.5,
    pt: 3,
  },
};

function ProductCreateView() {
  return (
    <MainLayout sx={{ ...style.root }} title="Product Create">
      <Container>
        <Header />
        <ProductCreateForm />
      </Container>
    </MainLayout>
  );
}

export default ProductCreateView;
