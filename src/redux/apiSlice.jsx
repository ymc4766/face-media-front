import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./constants";
// console.log("BASE_URL:", BASE_URL);

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Post", "User", "ConversationModal", "MessageModel", "category"],
  endpoints: (builder) => ({}),
});
