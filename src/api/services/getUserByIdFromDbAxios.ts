import { UserType } from "../../models";
import api, { EndPoints } from "../axios";

export async function getUserByIdFromDbAxios(id: string) {
  return api.get<UserType>(`${EndPoints.usersDb}/${id}`);
}
