import { motion } from "framer-motion";
import { ChevronDown, ChevronLeft } from "lucide-react";
import FriendsListItem from "./FriendshipListItem";
import { useState } from "react";
import { Friendship } from "@/core/store/api/gamesApi/types";

interface FriendshipsAccordionProps {
  title: string;
  icon: React.ReactNode;
  friendships: Friendship[];
  startOpen?: boolean;
}

export default function FriendshipsAccordion({
  title,
  icon,
  friendships,
  startOpen = false,
}: FriendshipsAccordionProps) {
  const [isOpen, setIsOpen] = useState(startOpen);

  const togglePendingAccordion = () => {
    setIsOpen(!isOpen);
  };

  const options = {
    hidden: { height: 0, opacity: 0, overflow: "hidden" },
    visible: {
      height: isOpen ? "auto" : 0,
      opacity: isOpen ? 1 : 0.6,
    },
  };

  return (
    <div role="listitem">
      <div onClick={togglePendingAccordion} className="flex gap-2 items-center cursor-pointer">
        {icon}
        <h6>
          {title} ({friendships.length})
        </h6>
        <div className="flex-1 h-[1px] ml-2 bg-white"></div>
        {isOpen ? <ChevronDown size={18} /> : <ChevronLeft size={18} />}
      </div>
      <motion.div
        initial={startOpen ? "visible" : "hidden"}
        animate={isOpen ? "visible" : "hidden"}
        exit="hidden"
        variants={options}
        transition={{ duration: 0.3 }}
        className=""
      >
        <div
          className={`flex flex-col gap-2 overflow-hidden md:grid md:grid-cols-2 md:gap-3 ${
            friendships.length > 0 ? "my-3" : ""
          } `}
        >
          {friendships.map((friendship) => (
            <FriendsListItem key={friendship._id} friendship={friendship} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
