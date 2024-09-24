import { User } from "@/core/types";
import { gamesApi } from "@/core/store/api/gamesApi";
import { LoginArgs, RegisterArgs } from "../../../types";
import { clearUser, initialState, setUser } from "@/core/store/slice/user/userSlice";

export const gamesApiAuth = gamesApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ message: string; user: User }, LoginArgs>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const { email, username } = data.user;
          dispatch(setUser({ ...initialState, email, username }));
        } catch (error) {
          console.error("Token verification failed", error);
        }
      },
      invalidatesTags: ["Friends", "GamesEdit"],
    }),
    register: builder.mutation<{ message: string }, RegisterArgs>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    verifyAccessToken: builder.query<{ message: string; user: User }, void>({
      query: () => ({ url: "/auth/is-logged-in", method: "GET" }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const { email, username } = data.user;
          dispatch(setUser({ ...initialState, email, username }));
        } catch (error) {
          console.error("Token verification failed", error);
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(clearUser());
        } catch (error) {
          console.error("Token verification failed", error);
        }
      },
      invalidatesTags: ["Friends", "GamesEdit"],
    }),
    refreshAccessToken: builder.mutation<{ message: string; user: User }, void>({
      query: () => ({ url: "/auth/refresh-token", method: "POST" }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const { email, username } = data.user;
          dispatch(setUser({ ...initialState, email, username }));
        } catch (error) {
          console.error("Token verification failed", error);
        }
      },
    }),
    verifyEmail: builder.query<{ message: string; user: User }, { token: string }>({
      query: (data) => ({ url: `/auth/verify-email/${data.token}`, method: "GET" }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const { email, username } = data.user;
          dispatch(setUser({ ...initialState, email, username }));
        } catch (error) {
          console.error("Token verification failed", error);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyAccessTokenQuery,
  useLazyVerifyAccessTokenQuery,
  useLogoutMutation,
  useRefreshAccessTokenMutation,
  useVerifyEmailQuery,
} = gamesApiAuth;
export const { login, register, verifyAccessToken, logout, verifyEmail } = gamesApiAuth.endpoints;
