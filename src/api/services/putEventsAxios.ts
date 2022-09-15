import { EventType } from "../../models";
import api, { EndPoints } from "../axios";

export async function putEventsAxios(update: EventType) {
  return api.put<EventType>(`${EndPoints.events}/${update.id}`, update);
}
