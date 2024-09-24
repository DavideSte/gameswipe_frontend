import { useContext } from "react";
import { ScreenSizeContext } from "../context/ScreenSizeContext";

export default function useIsDesktop() {
  const { isDesktop } = useContext(ScreenSizeContext);
  return isDesktop;
}
