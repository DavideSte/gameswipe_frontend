import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../store/api/gamesApi";
import { useAppDispatch } from "@/core/hooks/use-app-dispatch";
import { logout } from "../store/slice/auth/authSlice";
import Loader from "@/core/components/Loader";
import Alert from "@/core/components/Alert";

export default function LogoutPage() {
  const [runLogout, { isError, isLoading }] = useLogoutMutation();
  const hasCheckedRef = useRef(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const performLogout = async () => {
      if (hasCheckedRef.current) return;
      // prevent double calls
      hasCheckedRef.current = true;
      try {
        await runLogout().unwrap();
        // dispatch set HasLoggedOut to true, so i wont automatically verify again from login page
        dispatch(logout());
        navigate("/auth/login");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };
    performLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isError) {
    return (
      <Alert variant="destructive">
        <Alert.Title>Error</Alert.Title>
        <Alert.Description>Something went wrong.</Alert.Description>
      </Alert>
    );
  }

  return isLoading ? <Loader message="Logging out..." /> : null;
}
