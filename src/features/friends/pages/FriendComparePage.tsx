import { ChevronLeft } from "lucide-react";
import { NavLink, useParams } from "react-router-dom";
import { useGetFriendDataQuery } from "../store/api/gamesApi";
import Loader from "@/core/components/Loader";
import Alert from "@/core/components/Alert";
import CompareSection from "../components/CompareSection";

export default function FriendComparePage() {
  const params = useParams();
  const friendId = params.friendId || "";

  const { data, isFetching, isSuccess, isError, isLoading } = useGetFriendDataQuery(friendId, {
    skip: !friendId,
  });

  if (!friendId) {
    return (
      <Alert variant="destructive">
        <Alert.Title>No friend selected</Alert.Title>
        <Alert.Description>Please select a friend to compare</Alert.Description>
      </Alert>
    );
  }

  return (
    <div className="pb-20">
      {/* go back button */}
      <div className="flex w-full items-center p-4 gap-2">
        <NavLink to="/friends" className="flex items-center ">
          <ChevronLeft size={20} strokeWidth={3} />
        </NavLink>
        <h6>Friends</h6>
      </div>

      {isFetching || isLoading ? (
        <Loader message="Loading data..." />
      ) : isError || !isSuccess ? (
        <Alert variant="destructive" className="mx-4">
          <Alert.Title>Error loading friend data</Alert.Title>
          <Alert.Description>Something went wrong</Alert.Description>
        </Alert>
      ) : (
        <CompareSection data={data} />
      )}
    </div>
  );
}
