import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithRefresh } from "@/services/baseQueryWithRefresh";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRefresh, //staggeredBaseQuery,
  tagTypes: ["Profile", "Post"], // ["User", "Products", "Other"]
  endpoints: (builder) => ({}),
});
