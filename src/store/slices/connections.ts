import { createSlice } from "@reduxjs/toolkit";

export const connectionsSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    addConnection: (state, action) => {
      return action.payload;
    },
    removeConnection: () => null,
  },
});

export const { addConnection, removeConnection } = connectionsSlice.actions;

export default connectionsSlice.reducer;
