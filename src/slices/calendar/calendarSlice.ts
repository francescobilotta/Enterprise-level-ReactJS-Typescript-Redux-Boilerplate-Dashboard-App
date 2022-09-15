import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { profileNamespace } from "../../constants/namespaces";
import { calendarStateDefaultValue, EventType, RangeType } from "../../models";
import {
  createEventAsync,
  deleteEventAsync,
  getEventsAsync,
  updateEventAsync,
} from "./calendarAsyncActions";

export const slice = createSlice({
  extraReducers: (builder) => {
    // getEventsAsync
    builder.addCase(getEventsAsync.pending, (state) => {
      slice.caseReducers.setLoading(state, {
        payload: true,
        type: "setLoading",
      });
      slice.caseReducers.setError(state, {
        payload: "",
        type: "setError",
      });
    });
    builder.addCase(getEventsAsync.fulfilled, (state, action) => {
      slice.caseReducers.setLoading(state, {
        payload: false,
        type: "setLoading",
      });
      slice.caseReducers.setError(state, {
        payload: "",
        type: "setError",
      });
      slice.caseReducers.getEvents(state, {
        payload: action.payload,
        type: "getEvents",
      });
    });
    builder.addCase(getEventsAsync.rejected, (state, action) => {
      slice.caseReducers.setLoading(state, {
        payload: false,
        type: "setLoading",
      });
      slice.caseReducers.setError(state, {
        payload: action.error.toString(),
        type: "setError",
      });
      console.log(action.payload);
      console.log(action.error);
    });
    // createEventAsync
    builder.addCase(createEventAsync.pending, (state) => {
      slice.caseReducers.setLoading(state, {
        payload: true,
        type: "setLoading",
      });
      slice.caseReducers.setError(state, {
        payload: "",
        type: "setError",
      });
    });
    builder.addCase(createEventAsync.fulfilled, (state, action) => {
      slice.caseReducers.setLoading(state, {
        payload: false,
        type: "setLoading",
      });
      slice.caseReducers.setError(state, {
        payload: "",
        type: "setError",
      });
      slice.caseReducers.createEvent(state, {
        payload: action.payload,
        type: "createEvent",
      });
    });
    builder.addCase(createEventAsync.rejected, (state, action) => {
      slice.caseReducers.setLoading(state, {
        payload: false,
        type: "setLoading",
      });
      slice.caseReducers.setError(state, {
        payload: action.error.toString(),
        type: "setError",
      });
      console.log(action.payload);
      console.log(action.error);
    });
    // updateEventAsync
    builder.addCase(updateEventAsync.pending, (state) => {
      slice.caseReducers.setLoading(state, {
        payload: true,
        type: "setLoading",
      });
      slice.caseReducers.setError(state, {
        payload: "",
        type: "setError",
      });
    });
    builder.addCase(updateEventAsync.fulfilled, (state, action) => {
      slice.caseReducers.setLoading(state, {
        payload: false,
        type: "setLoading",
      });
      slice.caseReducers.setError(state, {
        payload: "",
        type: "setError",
      });
      slice.caseReducers.updateEvent(state, {
        payload: action.payload,
        type: "updateEvent",
      });
    });
    builder.addCase(updateEventAsync.rejected, (state, action) => {
      slice.caseReducers.setLoading(state, {
        payload: false,
        type: "setLoading",
      });
      slice.caseReducers.setError(state, {
        payload: action.error.toString(),
        type: "setError",
      });
      console.log(action.payload);
      console.log(action.error);
    });
    // deleteEventAsync
    builder.addCase(deleteEventAsync.pending, (state) => {
      slice.caseReducers.setLoading(state, {
        payload: true,
        type: "setLoading",
      });
      slice.caseReducers.setError(state, {
        payload: "",
        type: "setError",
      });
    });
    builder.addCase(deleteEventAsync.fulfilled, (state, action) => {
      slice.caseReducers.setLoading(state, {
        payload: false,
        type: "setLoading",
      });
      slice.caseReducers.setError(state, {
        payload: "",
        type: "setError",
      });
      slice.caseReducers.deleteEvent(state, {
        payload: action.payload,
        type: "deleteEvent",
      });
    });
    builder.addCase(deleteEventAsync.rejected, (state, action) => {
      slice.caseReducers.setLoading(state, {
        payload: false,
        type: "setLoading",
      });
      slice.caseReducers.setError(state, {
        payload: action.error.toString(),
        type: "setError",
      });
      console.log(action.payload);
      console.log(action.error);
    });
  },
  initialState: calendarStateDefaultValue,
  name: profileNamespace,
  reducers: {
    closeModal(state) {
      state.isModalOpen = false;
      state.selectedEventId = undefined;
      state.selectedRange = undefined;
    },
    createEvent(state, action: PayloadAction<EventType>) {
      state.events.push(action.payload);
    },
    deleteEvent(state, action: PayloadAction<string>) {
      state.events = state.events.filter((e) => e.id !== action.payload);
    },
    getEvents(state, action: PayloadAction<EventType[]>) {
      state.events = action.payload;
    },
    openModal(state) {
      state.isModalOpen = true;
    },
    selectEvent(state, action: PayloadAction<string>) {
      state.isModalOpen = true;
      state.selectedEventId = action.payload;
    },
    selectRange(state, action: PayloadAction<RangeType>) {
      const { start, end } = action.payload;
      state.isModalOpen = true;
      state.selectedRange = {
        end,
        start,
      };
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    updateEvent(state, action: PayloadAction<EventType>) {
      const index = state.events.findIndex((e) => e.id === action.payload.id);
      state.events[index] = action.payload;
    },
  },
});

export default slice.reducer;
