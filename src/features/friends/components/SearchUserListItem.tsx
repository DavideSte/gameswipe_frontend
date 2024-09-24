import { Check, Clock, LoaderCircle, Plus } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useCreateFriendMutation } from "../store/api/gamesApi";
import { User } from "@/core/types";
import { Friendship } from "@/core/store/api/gamesApi/types";

interface SearchUserListItemProps {
  user: User;
  status: Friendship["status"];
}

export default function SearchUserListItem({ user, status }: SearchUserListItemProps) {
  const { username, email, avatar, _id } = user;
  const [addFriendMutation, { isLoading, isSuccess }] = useCreateFriendMutation();

  const addFriend = () => {
    addFriendMutation({ friendId: _id });
  };

  let action;
  if (status === "pending") {
    action = <Clock size={18} />;
  } else if (status === "accepted") {
    action = <Check size={18} />;
  } else {
    action = (
      <button disabled={isLoading || isSuccess} onClick={addFriend}>
        {isLoading ? <LoaderCircle className="animate-spin" /> : <Plus size={20} />}
      </button>
    );
  }

  return (
    <div className="flex gap-2 bg-color2 rounded-lg overflow-hidden flex-shrink-0" role="listitem">
      {/* left icon image */}
      <div className="w-14 h-14 flex-shrink-0 bg-red-300">
        <LazyLoadImage
          src={avatar}
          alt={username}
          className="w-full h-full object-cover pointer-events-none"
          effect="blur"
          height="100%"
          width="100%"
        />
      </div>

      <div className="truncate flex flex-col justify-center flex-1 p-1 ">
        <p className="truncate text-sm font-semibold">@{username}</p>
        <p className="truncate text-xs text-gray-400 mt-1">{email}</p>
      </div>
      <div className="flex h-full items-center pl-1 pr-3">{action}</div>
    </div>
  );
}
