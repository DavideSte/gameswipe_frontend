import { Outlet } from "react-router-dom";
import useMediaQuery from "../hooks/use-media-queries";
import { ScreenSizeContext } from "../context/ScreenSizeContext";

export default function RootPage() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <ScreenSizeContext.Provider value={{ isDesktop }}>
      <Outlet />
    </ScreenSizeContext.Provider>
  );
}
