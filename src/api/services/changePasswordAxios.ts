import { ChangePasswordType } from "../../models";
import api, { EndPoints } from "../axios";

export async function changePasswordAxios(
  changePasswordType: ChangePasswordType
) {
  return api.put<void>(
    `${EndPoints.users}/${changePasswordType.id}`,
    changePasswordType
  );
}
