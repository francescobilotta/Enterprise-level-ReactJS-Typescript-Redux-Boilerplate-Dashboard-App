import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Theme,
} from "@mui/material";
import { useSnackbar } from "notistack";
import * as React from "react";

import { getProductAxios } from "../../api/services";
import { MainLayout } from "../../layouts";
import { ProductType } from "../../models";
import Header from "./Header";
import Results from "./Results";

const style = {
  backdrop: {
    color: "#fff",
    zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
  },
  root: {
    minHeight: "100%",
    pb: 12.5,
    pt: 3,
  },
};

function ProductListView() {
  const [open, setOpen] = React.useState(false);
  const [products, setProducts] = React.useState<ProductType[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleToggle = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const fetchProduct = async () => {
    handleToggle();
    try {
      const { data } = await getProductAxios();
      setProducts(data);
    } catch (e) {
      enqueueSnackbar("Something happened. Please try again.", {
        variant: "error",
      });
    }
    handleClose();
  };

  React.useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <MainLayout sx={{ ...style.root }} title="Product List">
      <Container maxWidth={false}>
        <Header />
        {products && (
          <Box mt={3}>
            <Results fetchProduct={fetchProduct} products={products} />
          </Box>
        )}
        <Backdrop open={open} sx={{ ...style.backdrop }} onClick={handleClose}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    </MainLayout>
  );
}

export default ProductListView;
