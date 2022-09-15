import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  deleteEventAxios,
  getEventsAxios,
  postEventsAxios,
  putEventsAxios,
} from "../../api/services";
import { EventType } from "../../models";
import { CalendarActionTypes } from "./calendarActionTypes";

export const getEventsAsync = createAsyncThunk(
  CalendarActionTypes.GET_EVENTS_ASYNC,
  async (_, thunkAPI) => {
    try {
      const response = await getEventsAxios();
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
    }
  }
);

export const createEventAsync = createAsyncThunk(
  CalendarActionTypes.CREATE_EVENT_ASYNC,
  async (event: EventType, thunkAPI) => {
    try {
      const response = await postEventsAxios(event);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
    }
  }
);

export const updateEventAsync = createAsyncThunk(
  CalendarActionTypes.UPDATE_EVENT_ASYNC,
  async (update: EventType, thunkAPI) => {
    try {
      const response = await putEventsAxios(update);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
    }
  }
);

export const deleteEventAsync = createAsyncThunk(
  CalendarActionTypes.DELETE_EVENT_ASYNC,
  async (id: string | undefined, thunkAPI) => {
    if (typeof id !== undefined) {
      try {
        const response = await deleteEventAxios(id!);
        return response.data;
      } catch (error: unknown) {
        if (error instanceof Error) {
          return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
      }
    }
    return thunkAPI.rejectWithValue(`Can't delete event with undefined event`);
  }
);
