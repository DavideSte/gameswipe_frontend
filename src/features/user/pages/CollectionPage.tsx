import GameList from "../components/GameList";
import useScrollToTop from "@/core/hooks/use-scroll-to-top";
import { useUserSelector } from "@/core/store/slice/user/userSelector";
import { getGamesFromStorage } from "@/core/utils";
import { useMemo } from "react";

export default function CollectionPage() {
  useScrollToTop();
  const { playedGames } = useUserSelector();

  const data = useMemo(() => {
    return getGamesFromStorage();
  }, []);

  const games = data.length > 0 ? data.filter((game) => playedGames.includes(game.id)) : [];

  return (
    <>
      <h4 className="pt-4 px-4">Your Collection</h4>
      <GameList games={games} />
    </>
  );
}
