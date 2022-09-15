import { EventType } from "../../models";
import api, { EndPoints } from "../axios";

export async function getEventsAxios() {
  return api.get<EventType[]>(EndPoints.events);
}
