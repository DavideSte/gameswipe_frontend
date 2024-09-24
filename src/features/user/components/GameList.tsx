import { Game } from "@/core/store/api/gamesApi/types";
import GameListItem from "./GameListItem";

interface GameListProps {
  games: Game[];
}

export default function GameList({ games }: GameListProps) {
  return (
    <div className="flex flex-col gap-4 p-4 pb-16 md:grid md:grid-cols-2" role="list">
      {games.map((game) => (
        <GameListItem key={game.id} game={game} />
      ))}
      {games.length === 0 && <p className="text-center text-lg text-slate-400">No games found</p>}
    </div>
  );
}
