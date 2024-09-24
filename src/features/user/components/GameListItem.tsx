import { Game } from "@/core/store/api/gamesApi/types";
import { Category } from "@/core/store/api/gamesApi/types/enums";
import { Calendar, Joystick, LucideProps, Star } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface GameListItemProps {
  game: Game;
}

export default function GameListItem({ game }: GameListItemProps) {
  const { name, artworks, total_rating, category, total_rating_count, first_release_date } = game;

  const imageHash = artworks[0].image_id;
  const url = `https://images.igdb.com/igdb/image/upload/t_720p/${imageHash}.jpg`;
  const rating_value = Math.round(total_rating * 10) / 10;
  const year = new Date(first_release_date * 1000).getFullYear();

  return (
    <div className="flex gap-2 h-32  bg-color2 rounded-md overflow-hidden" role="listitem">
      {/* left icon image */}
      <div className="h-full w-32 flex-shrink-0 bg-red-300">
        <LazyLoadImage
          src={url}
          alt={name}
          className="w-full h-full object-cover pointer-events-none"
          effect="blur"
          height="100%"
          width="100%"
        />
      </div>

      {/* Title */}
      <div className="truncate p-2 py-4 flex flex-col flex-1 ">
        <h6 className="truncate">{name}</h6>
        <div className="flex flex-col gap-1 mt-2">
          <Label Icon={Joystick} text={Category[category]} />
          <Label Icon={Calendar} text={year.toString()} />
          <Label Icon={Star} text={`${rating_value}/100 (${total_rating_count})`} />
        </div>
      </div>
    </div>
  );
}

const Label = ({
  text,
  Icon,
}: {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  text: string;
}) => (
  <div className="flex flex-col gap-2 text-sm text-slate-400">
    <div className="flex items-center gap-2">
      <Icon strokeWidth={3} size={14} />
      <p className="font-semibold ">{text}</p>
    </div>
  </div>
);
