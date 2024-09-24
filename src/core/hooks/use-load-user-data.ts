import { useEffect, useState } from "react";
import { useLazyUserGamesQuery } from "../store/api/gamesApi";
import { Game } from "../store/api/gamesApi/types";
import { useUserSelector } from "../store/slice/user/userSelector";
import { getGamesFromStorage } from "../utils";
import { useLocation } from "react-router-dom";

export default function useLoadUserData() {
  const [
    loadUserData,
    {
      isLoading: isLoadingGames,
      isFetching: isFetchingGames,
      isSuccess: isSuccessGames,
      isError,
      isUninitialized,
    },
  ] = useLazyUserGamesQuery();
  const { likedGames, playedGames } = useUserSelector();
  const [isLoadingStorage, setIsLoadingStorage] = useState(true);
  const isLoading = isFetchingGames || isLoadingGames || isLoadingStorage;
  const isSuccess = (!isUninitialized && isSuccessGames) || !isLoadingStorage;
  const location = useLocation();

  // every time the pathname changes, check if the liked and played games are already in the store
  // otherwise fetch the missing ones
  useEffect(() => {
    const isGameLoaded = likedGames.length > 0 || playedGames.length > 0;
    // if liked and played games are already in the store, check only for missing games
    if (isGameLoaded) {
      const storedGames: Game[] = getGamesFromStorage();
      const storedGamesIds = storedGames.map((game: Game) => game.id);

      const allGamesIds = [...likedGames, ...playedGames];
      const allContained = allGamesIds.every((gameId) => storedGamesIds.includes(gameId));

      // if there's some missing games in local storage, fetch them
      if (!allContained) {
        const missingGamesIds = [...likedGames, ...playedGames].filter(
          (gameId) => !storedGamesIds.includes(gameId)
        );
        loadUserData({ gamesIds: missingGamesIds });
      }
    }
    // otherwise, load all user data and sync the store with the local storage
    else {
      loadUserData();
    }
    setIsLoadingStorage(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return { isLoading, isSuccess, isError };
}
