import { createAsyncThunk } from "@reduxjs/toolkit";

import { getUserByIdFromDbAxios, putUserFromDbAxios } from "../../api/services";
import { UserType } from "../../models";
import { ProfileActionTypes } from "./profileActionTypes";

export const getProfileAsync = createAsyncThunk(
  ProfileActionTypes.FETCH_AND_SAVE_PROFILE,
  async (id: string, thunkAPI) => {
    try {
      return (await getUserByIdFromDbAxios(id)).data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
    }
  }
);

export const putProfileAsync = createAsyncThunk(
  ProfileActionTypes.UPDATE_PROFILE,
  async (user: UserType, thunkAPI) => {
    try {
      return (await putUserFromDbAxios(user)).data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
    }
  }
);
