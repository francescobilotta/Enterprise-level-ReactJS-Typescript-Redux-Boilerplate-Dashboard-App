import { ProductType } from "../../models";
import api, { EndPoints } from "../axios";

export async function deleteProductAxios(productId: string) {
  return api.delete<ProductType>(`${EndPoints.products}/${productId}`);
}
