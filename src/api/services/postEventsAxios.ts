import { EventType } from "../../models";
import api, { EndPoints } from "../axios";

export async function postEventsAxios(event: EventType) {
  return api.post<EventType>(EndPoints.events, event);
}
