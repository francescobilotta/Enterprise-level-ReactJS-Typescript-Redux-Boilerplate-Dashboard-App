import api, { EndPoints } from "../axios";

export async function deleteEventAxios(id: string) {
  return api.delete<string>(`${EndPoints.events}/${id}`);
}
