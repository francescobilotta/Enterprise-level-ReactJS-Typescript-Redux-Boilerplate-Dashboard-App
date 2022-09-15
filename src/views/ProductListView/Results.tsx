import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Theme,
} from "@mui/material";
import { useSnackbar } from "notistack";
import numeral from "numeral";
import * as React from "react";
import {
  ArrowRight as ArrowRightIcon,
  Edit as EditIcon,
  Image as ImageIcon,
  Search as SearchIcon,
} from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";

import { deleteProductAxios } from "../../api/services";
import { ProductType } from "../../models";
import { availabilityOptions, categoryOptions, sortOptions } from "../../utils";
import {
  applyFilters,
  applyPagination,
  getInventoryLabel,
  TableResultsHelpers,
} from "./TableResultsHelpers";

const style = {
  availabilityField: {
    flexBasis: 200,
    ml: 2,
  },
  bulkAction: {
    ml: 2,
  },
  bulkActions: {
    bgcolor: (theme: Theme) => theme.palette.background.default,
    marginTop: 6,
    pl: 0.5,
    position: "absolute",
    pr: 0.5,
    width: "100%",
    zIndex: 2,
  },
  bulkOperations: {
    position: "relative",
  },
  categoryField: {
    flexBasis: 200,
  },
  image: {
    height: 68,
    width: 68,
  },
  imageCell: {
    flexBasis: 68,
    flexGrow: 0,
    flexShrink: 0,
    fontSize: 0,
    width: 68,
  },
  queryField: {
    width: 500,
  },
  root: {},
  shippableField: {
    ml: 2,
  },
  stockField: {
    ml: 2,
  },
};

type Props = {
  className?: string;
  products: ProductType[];
  fetchProduct: () => Promise<void>;
};

function Results({ className = undefined, products, fetchProduct }: Props) {
  const [selectedProducts, setSelectedProducts] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [query, setQuery] = React.useState("");
  /* Explicitly stating that sort is an array of type string so we'll know on mouser hover that value is of type string. */
  const [sort, setSort] = React.useState<string>(sortOptions[0].value);
  const [filters, setFilters] = React.useState<TableResultsHelpers | any>({
    availability: null,
    category: null,
    inStock: null,
    isShippable: null,
  });
  const { enqueueSnackbar } = useSnackbar();

  /* Updates the query every time the user types on the keyboard */
  const handleQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.persist();
    setQuery(event.target.value);
  };
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.persist();
    let value: any = null;
    if (event.target.value !== "all") {
      value = event.target.value;
    }
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      category: value,
    }));
  };
  const handleAvailabilityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.persist();
    let value: any = null;
    if (event.target.value !== "all") {
      value = event.target.value;
    }
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      availability: value,
    }));
  };
  const handleStockChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.persist();
    let value: any = null;
    if (event.target.checked) {
      value = true;
    }
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      inStock: value,
    }));
  };
  const handleShippableChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.persist();
    let value: any = null;
    if (event.target.checked) {
      value = true;
    }
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      isShippable: value,
    }));
  };
  const handleSortChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.persist();
    setSort(event.target.value);
  };
  /* Updating all selected products */
  const handleSelectAllProducts = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedProducts(
      event.target.checked ? products.map((product) => product.id) : []
    );
  };
  /* Updating one selected product */
  const handleSelectOneProduct = (
    event: React.ChangeEvent<HTMLInputElement>,
    productId: string
  ): void => {
    if (!selectedProducts.includes(productId)) {
      setSelectedProducts((prevSelected) => [...prevSelected, productId]);
    } else {
      setSelectedProducts((prevSelected) =>
        prevSelected.filter((id) => id !== productId)
      );
    }
  };
  /* Deleting selected products */
  const deleteAllSelectedProducts = async (itemsToDelete: string[]) => {
    try {
      itemsToDelete.forEach((element) => {
        deleteProductAxios(element);
      });
    } catch (e) {
      enqueueSnackbar("Something happened. Please try again.", {
        variant: "error",
      });
    }
    await fetchProduct();
  };
  /* This is for the pagination */
  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };
  const handleLimitChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setLimit(parseInt(event.target.value, 10));
  };
  /* Usually query is done on the backend with indexing solutions, but we're doing it here just to simulate it */
  const filteredProducts = applyFilters(products, query, filters);
  const paginatedProducts = applyPagination(filteredProducts, page, limit);
  const enableBulkOperations = selectedProducts.length > 0;
  const selectedSomeProducts =
    selectedProducts.length > 0 && selectedProducts.length < products.length;
  const selectedAllProducts = selectedProducts.length === products.length;

  return (
    <Card className={className} sx={{ ...style.root }}>
      <Box p={2}>
        <Box alignItems="center" display="flex">
          <TextField
            placeholder="Search products"
            sx={{ ...style.queryField }}
            value={query}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon color="action" fontSize="small">
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              ),
            }}
            onChange={handleQueryChange}
          />
          <Box flexGrow={1} />
          <TextField
            select
            label="Sort By"
            name="sort"
            SelectProps={{ native: true }}
            value={sort}
            variant="outlined"
            onChange={handleSortChange}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Box>
        <Box alignItems="center" display="flex" mt={3}>
          <TextField
            select
            label="Category"
            name="category"
            SelectProps={{ native: true }}
            sx={{ ...style.categoryField }}
            value={filters.category || "all"}
            variant="outlined"
            onChange={handleCategoryChange}
          >
            {categoryOptions.map((categoryOption) => (
              <option key={categoryOption.id} value={categoryOption.id}>
                {categoryOption.name}
              </option>
            ))}
          </TextField>
          <TextField
            select
            label="Availability"
            name="availability"
            SelectProps={{ native: true }}
            sx={{ ...style.availabilityField }}
            value={filters.availability || "all"}
            variant="outlined"
            onChange={handleAvailabilityChange}
          >
            {availabilityOptions.map((avalabilityOption) => (
              <option key={avalabilityOption.id} value={avalabilityOption.id}>
                {avalabilityOption.name}
              </option>
            ))}
          </TextField>
          <FormControlLabel
            label="In Stock"
            sx={{ ...style.stockField }}
            control={
              <Checkbox
                checked={!!filters.inStock}
                name="inStock"
                onChange={handleStockChange}
              />
            }
          />
          <FormControlLabel
            label="Shippable"
            sx={{ ...style.shippableField }}
            control={
              <Checkbox
                checked={!!filters.isShippable}
                name="Shippable"
                onChange={handleShippableChange}
              />
            }
          />
        </Box>
      </Box>
      {enableBulkOperations && (
        <Box sx={{ ...style.bulkOperations }}>
          <Box sx={{ ...style.bulkActions }}>
            <Checkbox
              checked={selectedAllProducts}
              indeterminate={selectedSomeProducts}
              onChange={handleSelectAllProducts}
            />
            <Button
              sx={{ ...style.bulkAction }}
              variant="outlined"
              onClick={() => deleteAllSelectedProducts(selectedProducts)}
            >
              Delete
            </Button>
            <Button sx={{ ...style.bulkAction }} variant="outlined">
              Edit
            </Button>
          </Box>
        </Box>
      )}
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAllProducts}
                    indeterminate={selectedSomeProducts}
                    onChange={handleSelectAllProducts}
                  />
                </TableCell>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell>Inventory</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Attributes</TableCell>
                <TableCell>Price</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedProducts.map((product) => {
                const isProductSelected = selectedProducts.includes(product.id);
                return (
                  <TableRow key={product.id} hover selected={isProductSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isProductSelected}
                        value={isProductSelected}
                        onChange={(event) =>
                          handleSelectOneProduct(event, product.id)
                        }
                      />
                    </TableCell>
                    <TableCell sx={{ ...style.imageCell }}>
                      {product.image ? (
                        <Box
                          alt="Product"
                          component="img"
                          src={product.image}
                          sx={{ ...style.image }}
                        />
                      ) : (
                        <Box bgcolor="background.dark" p={2}>
                          <SvgIcon>
                            <ImageIcon />
                          </SvgIcon>
                        </Box>
                      )}
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      {getInventoryLabel(product.inventoryType)}
                    </TableCell>
                    <TableCell>
                      {product.quantity} in stock
                      {product.variants > 1 &&
                        ` in ${product.variants} variants`}
                    </TableCell>
                    <TableCell>
                      {product.attributes.map((attr) => attr)}
                    </TableCell>
                    <TableCell>
                      {numeral(product.price).format(
                        `${product.currency}0,0.00`
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton>
                        <SvgIcon fontSize="small">
                          <EditIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton>
                        <SvgIcon fontSize="small">
                          <ArrowRightIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filteredProducts.length}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
          />
        </Box>
      </PerfectScrollbar>
    </Card>
  );
}

export default Results;
