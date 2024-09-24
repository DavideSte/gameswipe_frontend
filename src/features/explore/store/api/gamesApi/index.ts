import { gamesApi } from "@/core/store/api/gamesApi";
import {
  addLikedGame,
  addPlayedGame,
  removeLikedGame,
  removePlayedGame,
} from "@/core/store/slice/user/userSlice";

const gamesApiSwipe = gamesApi.injectEndpoints({
  endpoints: (builder) => ({
    swipe: builder.mutation<
      void,
      { status: "played" | "non-played" | "liked" | "disliked"; gameId: number }
    >({
      query: (body) => {
        return {
          url: "users/me/games",
          method: "POST",
          body,
        };
      },
      // change the state optimistically and revert it if something goes wrong
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const { status, gameId } = arg;
        try {
          if (status === "played") {
            dispatch(addPlayedGame(gameId));
          } else if (status === "liked") {
            dispatch(addLikedGame(gameId));
          }
          await queryFulfilled;
        } catch (error) {
          console.log("Error", error);
          // if something goes wrong, revert the action
          if (status === "played") {
            dispatch(removePlayedGame(gameId));
          } else if (status === "liked") {
            dispatch(removeLikedGame(gameId));
          }
        }
      },
      invalidatesTags: ["GamesEdit"],
    }),
  }),
});

export const { useSwipeMutation } = gamesApiSwipe;
