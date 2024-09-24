import { useLocation } from "react-router-dom";
import { useVerifyEmailQuery } from "../store/api/gamesApi";
import Loader from "@/core/components/Loader";
import Alert from "@/core/components/Alert";
import { isErrorWithMessage } from "../utils/helpers";

// verify email registration token and log in if successful
export default function VerifyTokenPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token") || "";

  const { isError, error, isFetching, isUninitialized, isSuccess } = useVerifyEmailQuery(
    { token },
    { skip: !token }
  );

  if (!token) {
    return (
      <Alert variant="destructive">
        <Alert.Title>Verification failed</Alert.Title>
        <Alert.Description>Token is missing</Alert.Description>
      </Alert>
    );
  }

  if (isUninitialized || isFetching) {
    return <Loader message="Verifying token..." />;
  }

  if (isError) {
    const errorMessage = isErrorWithMessage(error)
      ? error.data.message
      : "An unexpected error occurred during verification. Please try again.";
    return (
      <Alert variant="destructive">
        <Alert.Title>Verification failed</Alert.Title>
        <Alert.Description>{errorMessage}</Alert.Description>
      </Alert>
    );
  }

  if (isSuccess) {
    return (
      <Alert variant="success">
        <Alert.Title>Verification successful</Alert.Title>
        <Alert.Description>Your email has been verified</Alert.Description>
      </Alert>
    );
  }

  return null;
}
