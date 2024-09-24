import Modal from "@/core/components/Modal";
import { Game } from "@/core/store/api/gamesApi/types";
import SwipeCard from "@/features/explore/components/SwipeCard";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function GameListItem({ game, swipe }: { game: Game; swipe: boolean }) {
  const { name, artworks } = game;

  const [isOpen, setIsOpen] = useState(false);
  const imageHash = artworks[0].image_id;
  const url = `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageHash}.jpg`;

  // only first 20 char of name if exceeds
  const shortName = name.length > 20 ? name.slice(0, 17) + "..." : name;

  const openModal = () => {
    if (!swipe) return;
    setIsOpen(true);
  };

  return (
    <>
      <div
        onClick={openModal}
        className="flex gap-2 h-36 w-28  rounded-md overflow-hidden relative flex-shrink-0 border border-white/15"
        role="listitem"
      >
        <div className="absolute bg-gradient-to-t from-black h-full w-full ">
          <LazyLoadImage
            src={url}
            alt={name}
            className="w-full h-full object-cover pointer-events-none"
            effect="blur"
            height="100%"
            width="100%"
          />
        </div>

        <div className="absolute bg-gradient-to-t from-black h-full w-full">
          <div className="flex items-end justify-center h-full w-full p-4">
            <h6 className="text-white text-sm">{shortName}</h6>
          </div>
        </div>
      </div>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <div className="px-8">
            <SwipeCard game={game} removeCard={() => setIsOpen(false)} isFront={true} />
          </div>
        </Modal>
      )}
    </>
  );
}
