import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { authNamespace } from "../../constants/namespaces";
import { authStateDefaultValue, ClaimsType } from "../../models";

export const slice = createSlice({
  extraReducers: {},
  initialState: authStateDefaultValue,
  name: authNamespace,
  reducers: {
    saveClaimsAction: (state, action: PayloadAction<ClaimsType>) => {
      state.claims = action?.payload;
    },
    saveTokenAction: (state, action: PayloadAction<string>) => {
      state.accessToken = action?.payload;
    },
  },
});

export default slice.reducer;
