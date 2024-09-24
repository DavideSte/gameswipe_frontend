import React, { useEffect, useRef } from "react";
import { useLazyVerifyAccessTokenQuery } from "../store/api/gamesApi";
import { useNavigate } from "react-router-dom";
import { useAuthSelector } from "../store/slice/auth/authSelector";
import Loader from "@/core/components/Loader";

export default function withHomeRedirect(Component: React.ComponentType) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function WithHomeRedirect(props: { [key: string]: any }) {
    const navigate = useNavigate();
    const [verifyToken, { isFetching, isLoading }] = useLazyVerifyAccessTokenQuery();
    const { isLogged, hasLoggedOut } = useAuthSelector();
    const hasCheckedRef = useRef(false);

    // verify if user already logged in
    useEffect(() => {
      // if user arrive from logout dont check token
      if (hasLoggedOut) return;
      if (!isLogged && !hasCheckedRef.current) {
        hasCheckedRef.current = true; // Prevent duplicate calls
        verifyToken();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (isLogged) {
        navigate("/"); // Redirect to home if already logged in
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogged]);

    if (isFetching || isLoading) {
      return <Loader message="Loading..." />;
    }

    return <Component {...props} />;
  };
}
