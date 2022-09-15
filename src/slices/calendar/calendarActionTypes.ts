import { calendarNamespace } from "../../constants/namespaces";

export const CalendarActionTypes = {
  CREATE_EVENT_ASYNC: `${calendarNamespace}/CREATE_EVENT_ASYNC`,
  DELETE_EVENT_ASYNC: `${calendarNamespace}/DELETE_EVENT_ASYNC`,
  GET_EVENTS_ASYNC: `${calendarNamespace}/GET_EVENTS_ASYNC`,
  UPDATE_EVENT_ASYNC: `${calendarNamespace}/UPDATE_EVENT_ASYNC`,
};
