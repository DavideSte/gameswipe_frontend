import { User } from "@/core/types";
import SearchUserListItem from "./SearchUserListItem";
import { Friendship } from "@/core/store/api/gamesApi/types";

interface SearchUserListProps {
  users: User[];
  friendshipStatusDict: Record<string, Friendship["status"]>;
}

export default function SearchUserList({ users, friendshipStatusDict }: SearchUserListProps) {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto gap-2" role="list">
      {users.length === 0 ? (
        <p className="text-sm mt-2">No users found.</p>
      ) : (
        users.map((user) => {
          return (
            <SearchUserListItem
              key={user._id}
              user={user}
              status={friendshipStatusDict[user._id] || undefined}
            />
          );
        })
      )}
    </div>
  );
}
