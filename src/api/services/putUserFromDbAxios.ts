import { UserType } from "../../models";
import api, { EndPoints } from "../axios";

export async function putUserFromDbAxios(user: UserType) {
  return api.put<UserType>(`${EndPoints.usersDb}/${user.id}`, user);
}
