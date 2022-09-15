import * as Yup from "yup";

import { InventoryType } from "./Inventory";

export type ProductType = {
  id: string;
  attributes: string[];
  category: string;
  createdAt: string | number;
  currency: string;
  image?: string;
  inventoryType: InventoryType;
  isAvailable: boolean;
  isShippable: boolean;
  name: string;
  price: number;
  quantity: number;
  updatedAt: string | number;
  variants: number;
  description: string;
  images: string[];
  includesTaxes: boolean;
  isTaxable: boolean;
  productCode: string;
  productSku: string;
  salePrice: string;
};

export const yupProductValidation = Yup.object().shape({
  category: Yup.string().max(255),
  description: Yup.string().max(5000),
  // eslint-disable-next-line react/forbid-prop-types
  images: Yup.array(),
  includesTaxes: Yup.bool().required(),
  isTaxable: Yup.bool().required(),
  name: Yup.string().max(255).required(),
  price: Yup.number().min(0).required(),
  productCode: Yup.string().max(255),
  productSku: Yup.string().max(255),
  salePrice: Yup.number().min(0),
});

export const productDefaultValue: ProductType = {
  attributes: [],
  category: "",
  createdAt: "",
  currency: "",
  description: "",
  id: "",
  image: "",
  images: [],
  includesTaxes: false,
  inventoryType: "in_stock",
  isAvailable: false,
  isShippable: false,
  isTaxable: false,
  name: "",
  price: 0,
  productCode: "",
  productSku: "",
  quantity: 0,
  salePrice: "",
  updatedAt: "",
  variants: 0,
};
