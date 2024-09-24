import Navbar from "@/core/components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuthSelector } from "../store/slice/auth/authSelector";
import { useLazyVerifyAccessTokenQuery } from "../store/api/gamesApi";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/core/hooks/use-app-dispatch";
import { logout } from "../store/slice/auth/authSlice";
import Loader from "@/core/components/Loader";
import OutletWithUserData from "../components/OutletWithUserData";

export default function ProtectedPage() {
  const { isLogged } = useAuthSelector();
  const navigate = useNavigate();
  const hasVerifiedToken = useRef(false);
  const [verifyToken, { isFetching, isLoading }] = useLazyVerifyAccessTokenQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const performLogout = async () => {
      if (hasVerifiedToken.current) return;
      hasVerifiedToken.current = true; // Prevent duplicate calls
      try {
        await verifyToken().unwrap();
        console.log("Token verified successfully");
      } catch (error) {
        console.log("Error verifying token:", error);
        // dispatch set HasLoggedOut to true, so i wont automatically verify again from login page
        dispatch(logout());
        navigate("/auth/login");
      }
    };

    if (!isLogged) {
      performLogout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || isFetching) {
    return <Loader message="Checking if user is logged" />;
  }

  if (!isLogged) {
    return <Loader message="Redirecting..." />;
  }

  return (
    <>
      <Navbar />
      <div className="md:mx-auto md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
        <OutletWithUserData />
      </div>
    </>
  );
}
