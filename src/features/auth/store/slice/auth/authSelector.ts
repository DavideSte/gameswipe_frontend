import { useAppSelector } from "@/core/hooks/use-app-selector";

export const useAuthSelector = () => {
  return useAppSelector((state) => state.auth);
};
