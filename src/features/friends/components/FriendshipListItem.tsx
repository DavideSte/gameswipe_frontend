import { Friendship } from "@/core/store/api/gamesApi/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useAcceptFriendRequestMutation } from "../store/api/gamesApi";
import { ExternalLink } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/core/components/Button";

interface FriendshipListItemProps {
  friendship: Friendship;
}

export default function FriendshipListItem({ friendship }: FriendshipListItemProps) {
  const { _id, friend, status, received } = friendship;
  const { username, email, avatar } = friend;

  const [acceptRequest, { isLoading, isSuccess }] = useAcceptFriendRequestMutation();

  const handleAcceptRequest = () => {
    acceptRequest({ friendshipId: _id });
  };

  return (
    <div
      className="flex gap-2 bg-color2 rounded-xl overflow-hidden flex-shrink-0 md:gap-4"
      role="listitem"
    >
      {/* left icon image */}
      <div className="w-16 h-16 flex-shrink-0 bg-red-300 md:w-[72px] md:h-[72px]">
        <LazyLoadImage
          src={avatar}
          alt={username}
          className="w-full h-full object-cover pointer-events-none"
          effect="blur"
          height="100%"
          width="100%"
        />
      </div>

      <div className="flex flex-1 gap-2 truncate">
        <div className="truncate flex flex-col justify-center flex-1  ">
          <p className="truncate text-sm font-semibold md:text-base">@{username}</p>
          <p className="truncate text-xs text-gray-400 mt-1 md:text-sm">{email}</p>
        </div>
        {received && status === "pending" && (
          <div className="flex items-center px-3">
            <Button disabled={isLoading || isSuccess} onClick={handleAcceptRequest} size="small">
              {isLoading ? "Loading..." : isSuccess ? "Accepted" : "Accept"}
            </Button>
          </div>
        )}

        {status === "accepted" && (
          <NavLink to={friend._id + "/compare"} className="flex items-center px-3 cursor-pointer">
            <ExternalLink size={20} />
          </NavLink>
        )}
      </div>
    </div>
  );
}
