import { ProductType } from "../../models";
import api, { EndPoints } from "../axios";

export async function postProductAxios(product: ProductType) {
  return api.post<ProductType>(EndPoints.products, product);
}
