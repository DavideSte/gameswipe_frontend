import FriendshipsList from "../components/FriendshipList";
import Modal from "@/core/components/Modal";
import { useState } from "react";
import SearchFriendForm from "../components/SearchUserForm";
import { useGetFriendshipsQuery } from "../store/api/gamesApi";
import Loader from "@/core/components/Loader";
import { Button } from "@/core/components/Button";

export default function FriendsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isFetching } = useGetFriendshipsQuery();
  const friendships = data && data.length > 0 ? data : [];

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:max-w-screen-md md:mx-auto lg:max-w-screen-lg">
      <div className="pt-4 px-4 flex items-center justify-between">
        <h4>Friends</h4>
        <Button onClick={toggleModal} size="small">
          + add friend
        </Button>
      </div>
      {isFetching ? <Loader /> : <FriendshipsList friendships={friendships} />}
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <SearchFriendForm />
        </Modal>
      )}
    </div>
  );
}
