import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { APT_URL } from "@/lib/types";
import toast from "react-hot-toast";

export const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs, // args can be a URL string or an object with more options
  unknown, // success type of the response
  FetchBaseQueryError // error type
> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: APT_URL,
    prepareHeaders: async (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("Content-Type", "application/json");
      }
      return headers;
    },
  });

  let result = await baseQuery(args, api, extraOptions);
  // console.log("RTK query--", result.data);

  if (result.error && result.error.status === 401) {
    console.log("Access token expired, logOut", result);
    const message = (result?.error?.data as { message: string })?.message;
    toast.error(message);
  }

  return result;
};
