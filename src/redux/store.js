import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,

    // posts: postSlice,
    // category: categorySlice,
    // chat: chatSlice,
    // notification: notificationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: true,
});

export default store;
