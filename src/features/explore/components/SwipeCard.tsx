import {
  useMotionValue,
  useTransform,
  useMotionValueEvent,
  useAnimation,
  motion,
} from "framer-motion";
import { X, Joystick, LucideProps, BookImage, Tag, Star, Heart } from "lucide-react";
import { useState } from "react";
import { Game } from "@/core/store/api/gamesApi/types";
import { Category } from "@/core/store/api/gamesApi/types/enums";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSwipeMutation } from "../store/api/gamesApi";
import { IoGameController } from "react-icons/io5";
import styled from "styled-components";

interface CardProps {
  game: Game;
  removeCard: () => void;
  isFront: boolean;
}

export default function SwipeCard({ game, removeCard, isFront }: CardProps) {
  const {
    name,
    artworks,
    total_rating,
    category,
    franchise,
    genres,
    keywords,
    first_release_date,
  } = game;
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 150], [-15, 15]);
  const opacity = useTransform(x, [-150, 0, 150], [0.95, 1, 0.95]);
  const [isRight, setIsRight] = useState(false);
  const [isLeft, setIsLeft] = useState(false);
  const controls = useAnimation();

  const [swipeCard] = useSwipeMutation();

  useMotionValueEvent(x, "change", (latest) => {
    if (latest > 10) {
      setIsRight(true);
      setIsLeft(false);
    } else if (latest < -10) {
      setIsLeft(true);
      setIsRight(false);
    } else {
      setIsLeft(false);
      setIsRight(false);
    }
  });

  const handleDragEnd = () => {
    if (x.get() > 100) {
      swipeCard({ status: "played", gameId: game.id });
    } else if (x.get() < -100) {
      swipeCard({ status: "non-played", gameId: game.id });
    } else {
      return;
    }
    removeCard();
  };

  // Function to simulate swipe action
  const simulateSwipe = (direction: "left" | "right") => {
    const targetX = direction === "right" ? 150 : -150;
    const targetRotate = direction === "right" ? 15 : -15;
    controls
      .start({
        x: targetX,
        rotate: targetRotate,
        transition: { duration: 0.3 },
      })
      .then(() => {
        removeCard();
        swipeCard({ status: direction === "right" ? "played" : "non-played", gameId: game.id });
      });
  };

  const simulateSwipeUp = () => {
    controls
      .start({
        x: 0,
        y: -800,
        rotate: 0,
        transition: { duration: 0.5 },
      })
      .then(() => {
        removeCard();
        swipeCard({ status: "liked", gameId: game.id });
      });
  };

  if (!artworks[0]) {
    console.log("No image found for", name);
    return null;
  }

  const imageHash = artworks[0].image_id;
  const url = `https://images.igdb.com/igdb/image/upload/t_720p/${imageHash}.jpg`;
  const rating_value = Math.round(total_rating * 10) / 10;
  const year = new Date(first_release_date * 1000).getFullYear();

  return (
    <motion.div
      drag="x"
      onDragEnd={handleDragEnd}
      animate={controls}
      dragConstraints={{
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
      style={{ gridRow: 1, gridColumn: 1, x, rotate, opacity }}
      className="w-full h-[calc(100dvh-126px)] no-scrollbar md:show-scrollbar bg-black overflow-y-auto relative hover:cursor-grab active:cursor-grabbing rounded-xl z-10 overflow-x-hidden"
    >
      {/* Image */}
      <div className="h-full w-full">
        <LazyLoadImage
          src={url}
          alt={name}
          className="h-[calc(100dvh-126px)] w-full object-cover pointer-events-none"
          effect="blur"
          width="100%"
        />
      </div>

      {/* Black filter on next card */}
      {!isFront && <div className="absolute top-0 w-full h-full bg-black/80"></div>}

      {/* Games Info */}
      <>
        <div className="absolute bottom-0 left-0 w-full flex flex-col gap-2 p-8 pb-28 pt-72 bg-gradient-to-t from-black">
          <div className="pb-4 w-full flex-col h-fit overflow-auto pointer-events-none">
            <h4>{name}</h4>
            <p className="font-bold">
              {franchise?.name ? franchise.name + ", " : ""} {year}
            </p>
            <div className="flex gap-1 text-sm font-bold items-center mt-2">
              {rating_value}/100 <Star size={18} fill="white" />
            </div>
          </div>
        </div>
        <div className="p-8 flex flex-col gap-8">
          <LabelWrapper Icon={Joystick} text="Category">
            <p>{Category[category]}</p>
          </LabelWrapper>
          <LabelWrapper Icon={BookImage} text="Genres">
            <p> {genres.map((g) => g.name).join(", ")}</p>
          </LabelWrapper>
          <LabelWrapper Icon={Tag} text="Keywords">
            <div className="flex flex-wrap gap-2">
              {keywords?.map((k, idx) => {
                if (idx > 8) return null;
                return <TagDiv key={k.id}>#{k.name}</TagDiv>;
              })}
            </div>
          </LabelWrapper>
        </div>

        {/* Actions */}
        <div className="w-full px-8 sticky left-0 bottom-0 flex justify-between items-end pb-8 ">
          <X
            className={`h-14 w-14 p-3 rounded-full ${
              isLeft ? "bg-red-500 text-slate-700" : "bg-slate-700 text-red-500"
            } `}
            fill="currentColor"
            onClick={() => simulateSwipe("left")}
            strokeWidth={3}
          />
          <Heart
            className="h-12 w-12 p-3 mb-3 rounded-full text-blue-500 bg-slate-700"
            fill="currentColor"
            onClick={() => simulateSwipeUp()}
          />
          <div
            className={`h-14 w-14 p-3 rounded-full flex justify-center items-center  ${
              isRight ? "bg-green-500" : "bg-slate-700"
            } `}
            onClick={() => simulateSwipe("right")}
          >
            <IoGameController
              className={`text-4xl ${isRight ? "text-slate-700" : "text-green-500"}`}
            />
          </div>
        </div>
      </>
    </motion.div>
  );
}

const TagDiv = styled.div.attrs({
  className: "bg-slate-700 text-white text-xs px-2 py-1 rounded-full w-fit",
})``;

const LabelWrapper = ({
  text,
  Icon,
  children,
}: {
  text: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-2 text-sm">
    <div className="flex items-center gap-2">
      <Icon strokeWidth={3} size={16} />
      <p className="font-semibold ">{text}</p>
    </div>
    <div>{children}</div>
  </div>
);
