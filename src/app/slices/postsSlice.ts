import { apiSlice } from "./apiSlice";
const POSTS_URL = "/api/posts";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPosts: builder.mutation({
      query: (data) => ({
        url: POSTS_URL,
        method: "POST",
        body: data,
      }),
    }),
    getPosts: builder.query({
      query: () => ({
        url: POSTS_URL,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreatePostsMutation, useGetPostsQuery } = postsApiSlice;
