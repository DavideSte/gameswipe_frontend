import { env } from "@/config/env";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({ baseUrl: env.GAMES_API_URL, credentials: "include" });

const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // if there's an error and it's a 401, try to refresh the access token
  if (result.error && result.error.status === 401) {
    const error = result.error;

    if (error.status !== 401) {
      return result;
    }

    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
      },
      api,
      extraOptions
    );

    // if response is ok, retry the original request
    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export default baseQueryWithReauth;
