import UserInfo from "@/core/components/UserInfo";
import { GetFriendDataResponse } from "@/core/store/api/gamesApi/types";
import { useUserSelector } from "@/core/store/slice/user/userSelector";
import { useMemo } from "react";
import CardsContainer from "./CardsContainer";
import { difference, intersection } from "@/core/utils";

interface CompareSectionProps {
  data: GetFriendDataResponse;
}

export default function CompareSection({ data }: CompareSectionProps) {
  const { gamesLikedByFriend, gamesPlayedByFriend, games } = data;
  const { likedGames, playedGames } = useUserSelector();
  const friendLikedGames = useMemo(() => new Set(gamesLikedByFriend || []), [gamesLikedByFriend]);
  const friendPlayedGames = useMemo(
    () => new Set(gamesPlayedByFriend || []),
    [gamesPlayedByFriend]
  );
  // no need to use useMemo here, the change is frequent
  const userLikedGames = new Set(likedGames);
  const userPlayedGames = new Set(playedGames);

  const commonLikedGames = intersection(userLikedGames, friendLikedGames);
  const commonPlayedGames = intersection(userPlayedGames, friendPlayedGames);

  const likedOnlyByFriend = difference(friendLikedGames, userLikedGames);
  const playedOnlyByFriend = difference(friendPlayedGames, userPlayedGames);

  const gamesInCommon = games.filter((game) => commonPlayedGames.has(game.id));
  const gamesLikedInCommon = games.filter((game) => commonLikedGames.has(game.id));
  const gamesLikedOnlyByFriend = games.filter((game) => likedOnlyByFriend.has(game.id));
  const gamesPlayedOnlyByFriend = games.filter((game) => playedOnlyByFriend.has(game.id));

  return (
    <>
      <div className="mt-4 m-8">
        <UserInfo user={data.friend} />
      </div>
      {/* common played games */}
      <CardsContainer games={gamesInCommon} title="Games played by both" />
      {/* common liked games */}
      <CardsContainer games={gamesLikedInCommon} title="Games liked by both" />
      {/* games only friend played */}
      <CardsContainer swipe games={gamesPlayedOnlyByFriend} title="Games only friend played:" />
      {/* games only friend liked */}
      <CardsContainer swipe games={gamesLikedOnlyByFriend} title="Game only friend liked:" />
    </>
  );
}
