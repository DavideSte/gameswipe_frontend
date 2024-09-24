import { useAppSelector } from "@/core/hooks/use-app-selector";

export const useUserSelector = () => {
  return useAppSelector((state) => state.user);
};
