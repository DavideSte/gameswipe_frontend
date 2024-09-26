import { User } from "@/core/types";
import { gamesApi } from "@/core/store/api/gamesApi";
import { Friendship, GetFriendDataResponse } from "@/core/store/api/gamesApi/types";

export const gamesApiFriends = gamesApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], { q: string }>({
      query: ({ q }) => ({
        url: "/users?q=" + q,
        method: "GET",
      }),
    }),
    getFriendships: builder.query<Friendship[], void>({
      query: () => ({
        url: `/users/me/friends`,
        method: "GET",
      }),
      providesTags: ["Friends"],
    }),
    createFriend: builder.mutation<User, { friendId: string }>({
      query: (body) => ({
        url: `/friends`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Friends"],
    }),
    acceptFriendRequest: builder.mutation<Friendship, { friendshipId: string }>({
      query: ({ friendshipId }) => ({
        url: `/friends/${friendshipId}/accept`,
        method: "PUT",
      }),
      invalidatesTags: ["Friends"], // Invalidate to refetch friend list after accepting
    }),
    getFriendData: builder.query<GetFriendDataResponse, string>({
      query: (friendId) => ({
        url: `/friends/${friendId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLazyGetUsersQuery,
  useCreateFriendMutation,
  useGetFriendshipsQuery,
  useAcceptFriendRequestMutation,
  useGetFriendDataQuery,
} = gamesApiFriends;
export const { getFriendships } = gamesApiFriends.endpoints;
