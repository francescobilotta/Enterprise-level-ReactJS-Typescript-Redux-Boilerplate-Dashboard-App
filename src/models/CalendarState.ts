import { EventType } from "./Event";
import { RangeType } from "./Range";

export type CalendarStateType = {
  events: EventType[];
  isModalOpen: boolean;
  selectedEventId?: string;
  selectedRange?: RangeType;
  loading: boolean; // useful for showing spinner or loading screen
  error: string;
};

export const calendarStateDefaultValue: CalendarStateType = {
  error: "",
  events: [],
  isModalOpen: false,
  loading: false,
  selectedEventId: undefined,
  selectedRange: undefined,
};
