import { createSlice } from "@reduxjs/toolkit";

export const requestsSlice = createSlice({
  name: "requests",
  initialState: [] as any[] | null,
  reducers: {
    addRequest: (state, action) => {
      return action.payload;
    },
    updateRequest: (state, action) => {
      const requestId = action.payload;
      return state?.filter((request: any) => request._id !== requestId);
    },
  },
});
export const { addRequest, updateRequest } = requestsSlice.actions;

export default requestsSlice.reducer;
