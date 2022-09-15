// eslint-disable-next-line simple-import-sort/imports
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import timelinePlugin from "@fullcalendar/timeline";
import { Container, Dialog, Paper, Theme, useMediaQuery } from "@mui/material";
import moment from "moment";
import * as React from "react";

import {
  closeModal,
  getEventsAsync,
  openModal,
  selectEvent,
  selectRange,
  updateEventAsync,
} from "../../slices/calendar";
import { RootState } from "../../app/store";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { MainLayout } from "../../layouts";
import { EventType, ViewType } from "../../models";
import AddEditEventForm from "./AddEditEventForm";
import Header from "./Header";
import Toolbar from "./Toolbar";

const style = {
  calendar: {
    "& .fc-unthemed .fc-axis": (theme: Theme) => ({
      ...theme.typography.body2,
    }),
    "& .fc-unthemed .fc-body": (theme: Theme) => ({
      backgroundColor: theme.palette.background.default,
    }),
    "& .fc-unthemed .fc-day-header": (theme: Theme) => ({
      ...theme.typography.subtitle2,
      color: theme.palette.text.secondary,
      fontWeight: theme.typography.fontWeightMedium,
      p: 1,
    }),
    "& .fc-unthemed .fc-day-top": (theme: Theme) => ({
      ...theme.typography.body2,
    }),
    "& .fc-unthemed .fc-divider": (theme: Theme) => ({
      borderColor: theme.palette.divider,
    }),
    "& .fc-unthemed .fc-event": {
      "& .fc-time": (theme: Theme) => ({
        ...theme.typography.h6,
        color: "inherit",
      }),
      "& .fc-title": (theme: Theme) => ({
        ...theme.typography.body1,
        color: "inherit",
      }),
      backgroundColor: (theme: Theme) => theme.palette.secondary.main,
      borderWidth: 2,
      color: (theme: Theme) => theme.palette.secondary.contrastText,
      opacity: 0.9,
    },
    "& .fc-unthemed .fc-head": {},
    "& .fc-unthemed .fc-highlight": {},
    "& .fc-unthemed .fc-list-empty": (theme: Theme) => ({
      ...theme.typography.subtitle1,
    }),
    "& .fc-unthemed .fc-list-heading td": (theme: Theme) => ({
      borderColor: theme.palette.divider,
    }),
    "& .fc-unthemed .fc-list-heading-alt": (theme: Theme) => ({
      ...theme.typography.h6,
    }),
    "& .fc-unthemed .fc-list-heading-main": (theme: Theme) => ({
      ...theme.typography.h6,
    }),
    "& .fc-unthemed .fc-list-item-time": (theme: Theme) => ({
      ...theme.typography.body2,
    }),
    "& .fc-unthemed .fc-list-item-title": (theme: Theme) => ({
      ...theme.typography.body1,
    }),
    "& .fc-unthemed .fc-list-item:hover td": {},
    "& .fc-unthemed .fc-list-view": {
      borderColor: (theme: Theme) => theme.palette.divider,
    },
    "& .fc-unthemed .fc-row": {
      borderColor: (theme: Theme) => theme.palette.divider,
    },
    "& .fc-unthemed td": {
      borderColor: (theme: Theme) => theme.palette.divider,
    },
    "& .fc-unthemed td.fc-today": {},
    "& .fc-unthemed th": {
      borderColor: (theme: Theme) => theme.palette.divider,
    },
    mt: 3,
    p: 2,
  },
  root: {
    minHeight: "100%",
    pb: 3,
    pt: 3,
  },
};

const selectedEventSelector = (state: RootState): EventType | undefined => {
  const { events, selectedEventId } = state.calendar;
  if (selectedEventId) {
    return events?.find((_event) => _event.id === selectedEventId);
  }
  return undefined;
};

function CalendarDefaultContent() {
  const dispatch = useAppDispatch();
  const { events, loading, error, isModalOpen, selectedRange } = useAppSelector(
    (state: RootState) => state.calendar
  );
  const selectedEvent = useAppSelector(selectedEventSelector);
  const [date, setDate] = React.useState<Date>(moment().toDate());
  const mobileDevice = useMediaQuery("(max-width:600px)");
  const [view, setView] = React.useState<ViewType>(
    mobileDevice ? "listWeek" : "dayGridMonth"
  );
  /* useRef is used to access DOM elements and
  to persist state or values in successive or next renders */
  const calendarRef = React.useRef<FullCalendar | null>(null);

  React.useEffect(() => {
    dispatch(getEventsAsync());
  }, [dispatch]);

  const handleAddClick = (): void => {
    dispatch(openModal());
  };

  const handleModalClose = (): void => {
    dispatch(closeModal());
  };

  const handleDateNext = (): void => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  const handleDatePrev = (): void => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleDateToday = (): void => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleViewChange = (newView: ViewType): void => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  const handleEventSelect = (arg: any): void => {
    dispatch(selectEvent(arg.event.id));
  };

  const handleEventDrop = async ({ event }: any): Promise<void> => {
    try {
      await dispatch(
        updateEventAsync({
          allDay: event.allDay,
          end: event.end,
          id: event.id,
          start: event.start,
        } as any)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleEventResize = async ({ event }: any): Promise<void> => {
    try {
      await dispatch(
        updateEventAsync({
          allDay: event.allDay,
          end: event.end,
          id: event.id,
          start: event.start,
        } as any)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleRangeSelect = (arg: any): void => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.unselect();
    }
    dispatch(
      selectRange({ end: arg.end.getTime(), start: arg.start.getTime() })
    );
  };

  return (
    <MainLayout sx={{ ...style.root }} title="Calendar">
      <Container maxWidth={false}>
        <Header onAddClick={handleAddClick} />
        <Toolbar
          date={date}
          view={view}
          onDateNext={handleDateNext}
          onDatePrev={handleDatePrev}
          onDateToday={handleDateToday}
          onViewChange={handleViewChange}
        />
        <Paper sx={{ ...style.calendar }}>
          <FullCalendar
            ref={calendarRef}
            allDayMaintainDuration
            dayMaxEventRows
            droppable
            editable
            eventResizableFromStart
            selectable
            weekends
            eventClick={handleEventSelect}
            eventDrop={handleEventDrop}
            eventResize={handleEventResize}
            events={events}
            headerToolbar={false}
            height={800}
            initialDate={date}
            initialView={view}
            rerenderDelay={10}
            select={handleRangeSelect}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
              timelinePlugin,
            ]}
          />
        </Paper>
        <Dialog
          fullWidth
          maxWidth="sm"
          open={isModalOpen}
          onClose={handleModalClose}
        >
          {isModalOpen && (
            <AddEditEventForm
              event={selectedEvent}
              range={selectedRange}
              onAddComplete={handleModalClose}
              onCancel={handleModalClose}
              onDeleteComplete={handleModalClose}
              onEditComplete={handleModalClose}
            />
          )}
        </Dialog>
        {loading && <h2>Loading... </h2>}
        {error && <h2>Something happened </h2>}
      </Container>
    </MainLayout>
  );
}

export default CalendarDefaultContent;
