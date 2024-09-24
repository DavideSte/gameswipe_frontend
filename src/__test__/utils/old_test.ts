// import { beforeEach, expect, test, vi } from "vitest";
// import { delay } from "msw";
// import { screen, waitFor } from "@testing-library/react";
// import WishlistPage from "./WishlistPage";
// import { Game } from "@/core/store/api/gamesApi/types";
// import { renderWithProviders } from "@/__test__/utils/renderWithProviders";
// import { useState, useEffect } from "react";
// import { describe } from "node:test";

// // Mock data
// const mockGames: Game[] = [];

// vi.mock("@/core/hooks/use-scroll-to-top", () => ({
//   __esModule: true,
//   default: vi.fn(() => {
//     // Custom behavior or no-op
//     console.log("Mocked useScrollToTop called");
//   }),
// }));

// // Mock the hook
// vi.mock("../store/api", () => {
//   return {
//     __esModule: true,
//     useUserGamesQuery: vi.fn(() => {
//       const [response, setResponse] = useState<{
//         data: Game[];
//         isError: boolean;
//         isFetching: boolean;
//       }>({
//         data: [],
//         isError: false,
//         isFetching: true,
//       });

//       // Simulate delay and then update the response
//       useEffect(() => {
//         const timer = setTimeout(() => {
//           setResponse({
//             data: mockGames,
//             isError: false,
//             isFetching: false,
//           });
//         }, 150); // Simulate network delay

//         return () => clearTimeout(timer);
//       }, []);

//       return response;
//     }),
//   };
// });

// describe("WishlistPage Component", () => {
//   beforeEach(() => {
//     renderWithProviders(<WishlistPage />);
//   });

//   test("Show loading correctly", async () => {
//     // render(<WishlistPage />);
//     expect(screen.getByText("Loading...")).toBeInTheDocument();
//   });

//   test("Show no games found", async () => {
//     // render(<WishlistPage />);
//     await waitFor(() => {
//       expect(screen.getByText("No games found")).toBeInTheDocument();
//     });
//   });
// });
