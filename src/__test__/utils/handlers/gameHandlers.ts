import { Game } from "@/core/store/api/gamesApi/types";
import { env } from "@/config/env";
import { DefaultBodyType, delay, http, HttpResponse } from "msw";

export const gameHandlers = {
  getGames: (games: Game[]) => {
    return http.get<never, DefaultBodyType, Game[]>(
      `${env.GAMES_API_URL}/users/me/games`,
      async () => {
        await delay(100);
        return HttpResponse.json(games);
      }
    );
  },
};
