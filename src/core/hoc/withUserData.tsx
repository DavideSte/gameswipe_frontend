import React from "react";
import useLoadUserData from "@/core/hooks/use-load-user-data";
import Loader from "@/core/components/Loader";
import Alert from "@/core/components/Alert";

export default function withUserData(Component: React.ComponentType) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function WithUserData(props: { [key: string]: any }) {
    const { isLoading, isError, isSuccess } = useLoadUserData();

    if (isLoading) {
      return <Loader message="Loading user data..." />;
    }

    if (isError || !isSuccess) {
      return (
        <Alert variant="destructive">
          <Alert.Title>Error loading user data</Alert.Title>
          <Alert.Description>Something went wrong</Alert.Description>
        </Alert>
      );
    }

    return <Component {...props} />;
  };
}
