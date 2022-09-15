import { UserType } from "../../models";
import axios, { EndPoints } from "../axios";

/* The return object will be an object with an access token of type string.
We're expecting an access token from the json-server-auth */
export async function loginAxios(userModel: UserType) {
  return axios.post<{ accessToken: string }>(EndPoints.login, userModel);
}
