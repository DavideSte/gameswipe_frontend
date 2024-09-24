import { lazy } from "react";
import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from "react-router-dom";
import withSuspense from "./core/hoc/withSuspense.tsx";

// lazy loaded Pages
const NotFoundPage = lazy(() => import("./core/pages/NotFoundPage.tsx"));
const FriendsPage = lazy(() => import("./features/friends/pages/FriendsPage.tsx"));
const ProfilePage = lazy(() => import("./features/user/pages/ProfilePage.tsx"));
const CollectionPage = lazy(() => import("./features/user/pages/CollectionPage.tsx"));
const WishlistPage = lazy(() => import("./features/user/pages/WishlistPage.tsx"));
const ExplorePage = lazy(() => import("./features/explore/pages/ExplorePage.tsx"));
const RootPage = lazy(() => import("./core/pages/RootPage.tsx"));
const ProtectedPage = lazy(() => import("./features/auth/pages/ProtectedPage.tsx"));
const LogoutPage = lazy(() => import("./features/auth/pages/LogoutPage.tsx"));
const VerifyTokenPage = lazy(() => import("./features/auth/pages/VerifyTokenPage.tsx"));
const FriendComparePage = lazy(() => import("./features/friends/pages/FriendComparePage.tsx"));
const SignUpPageHR = lazy(() => import("./features/auth/pages/SignUpPageHR.tsx"));
const LoginForm = lazy(() => import("./features/auth/components/LoginForm.tsx"));
const RegisterForm = lazy(() => import("./features/auth/components/RegisterForm.tsx"));

const router: RouteObject[] = [
  {
    path: "",
    element: <RootPage />,
    children: [
      {
        path: "auth",
        element: <SignUpPageHR />,
        children: [
          {
            index: true,
            element: <Navigate to="/auth/login" />,
          },
          {
            path: "login",
            element: withSuspense(<LoginForm />),
          },
          {
            path: "register",
            element: withSuspense(<RegisterForm />),
          },
          {
            path: "verify",
            element: withSuspense(<VerifyTokenPage />),
          },
        ],
      },
      {
        path: "",
        element: <ProtectedPage />,
        children: [
          { index: true, element: withSuspense(<ExplorePage />) },
          { path: "collection", element: withSuspense(<CollectionPage />) },
          { path: "wishlist", element: withSuspense(<WishlistPage />) },
          { path: "profile", element: withSuspense(<ProfilePage />) },
          { path: "logout", element: withSuspense(<LogoutPage />) },
          {
            path: "friends",
            children: [
              { index: true, element: withSuspense(<FriendsPage />) },
              { path: ":friendId/compare", element: withSuspense(<FriendComparePage />) },
            ],
          },
        ],
      },
      { path: "*", element: withSuspense(<NotFoundPage />) },
    ],
  },
];

export default function Routes() {
  return <RouterProvider router={createBrowserRouter(router)} />;
}
