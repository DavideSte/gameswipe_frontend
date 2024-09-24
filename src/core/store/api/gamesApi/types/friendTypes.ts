import { User } from "@/core/types";

export interface Friend {
  _id: string;
  username: string;
  avatar?: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Friendship {
  _id: string;
  friend: User;
  status: "pending" | "accepted" | "rejected" | undefined;
  createdAt: string;
  updatedAt: string;
  received: boolean;
}
