import { apiSlice } from "./apiSlice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getPost: build.query({
      query: (api: string) => ({ url: api }),
      providesTags: ["Post"],
    }),

    getProfile: build.query({
      query: (api: string) => ({ url: api }),
      providesTags: ["Profile"],
    }),

    createPost: build.mutation({
      query(body) {
        return {
          url: "post",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Post"],
    }),

    updatePost: build.mutation({
      query(body) {
        return {
          url: "post",
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["Profile", "Post"],
    }),

    deletePost: build.mutation({
      query(body) {
        return {
          url: "post",
          method: "DELETE",
          body,
        };
      },
      invalidatesTags: ["Profile", "Post"],
    }),
    createComment: build.mutation({
      query(body) {
        return {
          url: "comment",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetPostQuery,
  useGetProfileQuery,
  useCreatePostMutation,
  useCreateCommentMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = extendedApi;
