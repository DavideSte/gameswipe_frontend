import { ReactNode, Suspense } from "react";
import Loader from "../components/Loader";

const withSuspense = (element: ReactNode) => (
  <Suspense fallback={<Loader message="Loading..." />}>{element}</Suspense>
);

export default withSuspense;
