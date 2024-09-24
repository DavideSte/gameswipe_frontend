import { Game } from "../store/api/gamesApi/types";

export function updateGamesInStorage(games: Game[]) {
  // load the current games from the local storage
  const storedGames: Game[] = JSON.parse(localStorage.getItem("games") || "[]");
  // add the new games to the stored games, avoiding duplicates
  const newGames = games.filter(
    (game) => !storedGames.some((storedGame) => storedGame.id === game.id)
  );
  const updatedGames = [...storedGames, ...newGames];

  // update the local storage with the new games
  localStorage.setItem("games", JSON.stringify(updatedGames));
}

export function getGamesFromStorage(): Game[] {
  return JSON.parse(localStorage.getItem("games") || "[]");
}
