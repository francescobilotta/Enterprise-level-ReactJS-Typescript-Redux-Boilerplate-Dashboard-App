import { slice } from "./calendarSlice";

export const {
  updateEvent,
  setLoading,
  setError,
  selectRange,
  selectEvent,
  openModal,
  getEvents,
  deleteEvent,
  createEvent,
  closeModal,
} = slice.actions;

export {
  createEventAsync,
  deleteEventAsync,
  getEventsAsync,
  updateEventAsync,
} from "./calendarAsyncActions";
