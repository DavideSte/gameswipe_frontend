import { Game } from "@/core/store/api/gamesApi/types";
import GameListItem from "./GameListItem";
import { useState } from "react";
import Modal from "@/core/components/Modal";
import SwipeCard from "@/features/explore/components/SwipeCard";
import { RectangleVertical } from "lucide-react";

interface CardsContainerProps {
  games: Game[];
  title: string;
  icon?: string;
  swipe?: boolean;
}

export default function CardsContainer({ games, title, icon, swipe = false }: CardsContainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [excludedGames, setexcludedGames] = useState<number[]>([]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  if (games.length === 0) return null;

  return (
    <div>
      <div className="mt-4 mx-4 flex gap-2">
        {icon}
        <h5>{title}</h5>
        {swipe && (
          <button onClick={toggleModal} className="relative">
            <RectangleVertical fill="white" className="absolute top-0 z-20" />
            <RectangleVertical className="absolute top-1 left-2  rotate-[30deg] z-10" />
          </button>
        )}
      </div>
      <div className="flex p-4 gap-2 overflow-x-scroll no-scrollbar" role="list">
        {games.map((game) => (
          <GameListItem key={game.id} game={game} swipe={swipe} />
        ))}
      </div>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <div className="px-8 pb-3 flex-1 grid place-items-center  relative z-10">
            {[...games]
              .filter((game) => !excludedGames.includes(game.id))
              .reverse()
              .map((game) => (
                <SwipeCard
                  key={game.id}
                  game={game}
                  removeCard={() => setexcludedGames([...excludedGames, game.id])}
                  isFront={true}
                />
              ))}
            {games.length === 0 && (
              <div className="absolute h-full flex items-center">
                <p className="text-white">No more results, try extending your filters</p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
