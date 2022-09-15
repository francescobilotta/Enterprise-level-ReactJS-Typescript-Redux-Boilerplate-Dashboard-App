import { SaleType } from "../../models";
import api, { EndPoints } from "../axios";

export async function getSalesAxios() {
  return api.get<SaleType[]>(EndPoints.sales);
}
