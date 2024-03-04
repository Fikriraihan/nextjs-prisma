import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXTAUTH_URL,
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Post", "Counter"],
  endpoints: (builder) => ({}),
});
