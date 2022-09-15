import moment from "moment";
import * as Yup from "yup";

import { RangeType } from "./Range";

export type EventType = {
  id: string;
  allDay: boolean;
  color?: string;
  description: string;
  end: Date;
  start: Date;
  title: string;
};

export const yupEventValidation = Yup.object().shape({
  allDay: Yup.bool(),
  description: Yup.string().max(5000),
  end: Yup.date().when(
    "start",
    (start: Date, schema: any) =>
      start && schema.min(start, "End date must be later than start date")
  ),
  start: Yup.date(),
  title: Yup.string().max(255).required("Title is required"),
});

export const eventDefaultValue = (event?: EventType, range?: RangeType) => {
  const defaultEvent = {
    allDay: false,
    color: "",
    description: "",
    end: moment().add(30, "minutes").toDate(),
    start: moment().toDate(),
    submit: null,
    title: "",
  };

  if (event) {
    return { ...defaultEvent, ...event };
  }
  if (range) {
    const start = new Date(range.start);
    const end = new Date(range.end);
    return { ...defaultEvent, end, start };
  }
  return defaultEvent;
};
