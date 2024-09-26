import { User } from "@/core/types";
import { Category } from "./enums";

export interface GetGamesArgs {
  page: number;
  console: string[];
  company: string[];
  genres: string[];
  years: [number, number];
}

export interface Property {
  id: number;
  name: string;
}

export interface Game {
  id: number;
  artworks: {
    id: string;
    image_id: string;
  }[];
  category: Category;
  first_release_date: number;
  franchise?: Property;
  genres: Property[];
  keywords?: Property[];
  name: string;
  total_rating: number;
  total_rating_count: number;
  played?: boolean;
  liked?: boolean;
}

export interface GetFriendDataResponse {
  gamesLikedByFriend: number[];
  gamesPlayedByFriend: number[];
  games: Game[];
  friend: User;
}

export interface GetGamesResponse {
  games: Game[];
  likedGamesIds: number[];
  playedGamesIds: number[];
}
