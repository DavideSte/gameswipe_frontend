import { Search, UserRoundPlus, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useLazyGetUsersQuery } from "../store/api/gamesApi";
import Loader from "@/core/components/Loader";
import SearchUserList from "./SearchUserList";
import { Friendship } from "@/core/store/api/gamesApi/types";
import { useFriendsSelector } from "../store/slice/friends/friendsSelector";

export default function SearchUserForm() {
  const [input, setInput] = useState("");
  const [runSearch, { data, isFetching, isUninitialized, isSuccess }] = useLazyGetUsersQuery();
  const { friendships } = useFriendsSelector();

  const friendshipStatusDict = useMemo(() => {
    return friendships.reduce((acc, friendship) => {
      acc[friendship.friend._id] = friendship.status;
      return acc;
    }, {} as Record<string, Friendship["status"]>);
  }, [friendships]);

  const clearSearch = () => {
    setInput("");
  };

  const searchUsers = () => {
    if (!input) return;
    runSearch({ q: input });
  };

  let content;
  if (isUninitialized) {
    content = <p className="text-sm mt-2">Search for a user.</p>;
  } else if (isFetching) {
    content = <Loader message="Fetching users..." />;
  } else if (isSuccess) {
    const users = data && data.length > 0 ? data : [];
    content = <SearchUserList users={users} friendshipStatusDict={friendshipStatusDict} />;
  }

  return (
    <div className="bg-color1 h-[80dvh] flex flex-col w-[90dvw] shadow-md border border-white/15 rounded-xl p-8 md:max-w-screen-md">
      {/* Title */}
      <div className="flex items-center gap-2">
        <UserRoundPlus strokeWidth={3} size={20} />
        <h5>Add a new friend </h5>
      </div>

      {/* Search Input */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          searchUsers();
        }}
        className="mt-4 relative"
      >
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Search email or username..."
          className="outline-none w-full bg-white/25 pr-[70px] text-sm py-3 px-4 rounded-lg text-white border border-transparent focus-visible:border-white/25 focus-visible:ring-offset-0;"
        />
        <div className="absolute right-0 top-0 h-full px-3 items-center w-fit flex">
          {input && <X size={19} onClick={clearSearch} />}
          <div className="w-[2px] bg-white/60 h-7 m-2"></div>
          <Search fill="white" size={19} />
        </div>
      </form>

      <hr className="my-4 border-white/20" />
      {/* Results */}
      {content}
    </div>
  );
}
