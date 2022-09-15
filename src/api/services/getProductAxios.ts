import { ProductType } from "../../models";
import api, { EndPoints } from "../axios";

export async function getProductAxios() {
  return api.get<ProductType[]>(EndPoints.products);
}
