import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";
import { Game, GetGamesArgs, GetGamesResponse } from "./types";
import { updateGamesInStorage } from "@/core/utils";
import { setLikedGames, setPlayedGames } from "../../slice/user/userSlice";

const gamesApi = createApi({
  reducerPath: "gamesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["GamesEdit", "Friends"],
  endpoints: (builder) => ({
    getGames: builder.query<Game[], GetGamesArgs>({
      query: ({ page, console, company, years, genres }) => {
        const searchParams = new URLSearchParams();
        searchParams.append("page", page.toString());
        if (console.length > 0) {
          searchParams.append("console", console.join(","));
        }
        if (company.length > 0) {
          searchParams.append("company", company.join(","));
        }
        if (genres.length > 0) {
          searchParams.append("genre", genres.join(","));
        }
        if (years[0]) {
          searchParams.append("startYear", years[0].toString());
        }
        if (years[1]) {
          searchParams.append("endYear", years[1].toString());
        }
        return "/games?" + searchParams.toString();
      },
    }),
    userGames: builder.query<GetGamesResponse, void | { gamesIds: number[] }>({
      query: (body) => {
        const params = body?.gamesIds ? body.gamesIds.join(",") : null;
        const url = params ? `games?GamesIds=${params}` : "games";
        return {
          url: "users/me/" + url,
          method: "GET",
        };
      },
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const { games, likedGamesIds, playedGamesIds } = data;
          updateGamesInStorage(games);
          dispatch(setLikedGames(likedGamesIds));
          dispatch(setPlayedGames(playedGamesIds));
        } catch (error) {
          console.error("Token verification failed", error);
        }
      },
    }),
  }),
});

export { gamesApi };
export const { useLazyGetGamesQuery, useLazyUserGamesQuery, useUserGamesQuery } = gamesApi;
