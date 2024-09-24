import { useAppSelector } from "@/core/hooks/use-app-selector";

export const useFriendsSelector = () => {
  return useAppSelector((state) => state.friends);
};
