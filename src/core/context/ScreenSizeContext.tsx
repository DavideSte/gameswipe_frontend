import { createContext } from "react";

interface ScreenSizeContextType {
  isDesktop: boolean;
}

export const ScreenSizeContext = createContext<ScreenSizeContextType>({
  isDesktop: false,
});
