import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user";
import feedSlice from "./slices/feed";
import connectionsSlice from "./slices/connections";
import requestsSlice from "./slices/requests";

export const store = configureStore({
  reducer: {
    user: userSlice,
    feed: feedSlice,
    connections: connectionsSlice,
    requests: requestsSlice,
  },
});
