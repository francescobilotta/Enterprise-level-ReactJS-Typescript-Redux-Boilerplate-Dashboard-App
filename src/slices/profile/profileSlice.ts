import { createSlice } from "@reduxjs/toolkit";

import { profileNamespace } from "../../constants/namespaces";
import { profileStateDefaultValue } from "../../models";
import { getProfileAsync, putProfileAsync } from "./profileAsyncActions";

export const profileSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(getProfileAsync.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getProfileAsync.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addCase(getProfileAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = "Something wrong happened";
      console.log(action?.payload);
    });
    builder.addCase(putProfileAsync.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(putProfileAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(putProfileAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = "Something wrong happened";
      console.log(action?.payload);
    });
  },
  initialState: profileStateDefaultValue,
  name: profileNamespace,
  reducers: {},
});

export default profileSlice.reducer;
