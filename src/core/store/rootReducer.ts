import { combineReducers, PayloadAction } from "@reduxjs/toolkit";
import { gamesApi } from "./api/gamesApi";
import { authSlice } from "@/features/auth/store/slice/auth/authSlice";
import { userSlice } from "@/core/store/slice/user/userSlice";
import { friendsSlice } from "@/features/friends/store/slice/friends/friendsSlice";

const combinedReducers = combineReducers({
  user: userSlice.reducer,
  auth: authSlice.reducer,
  friends: friendsSlice.reducer,
  [gamesApi.reducerPath]: gamesApi.reducer,
});

export const rootReducer = (
  state: ReturnType<typeof combinedReducers> | undefined,
  action: PayloadAction
) => {
  if (action.type === "RESET") {
    state = undefined; // Reset the entire state
  }
  return combinedReducers(state, action);
};

export function createInitialState(): ReturnType<typeof combinedReducers> {
  return {
    user: userSlice.getInitialState(),
    auth: authSlice.getInitialState(),
    friends: friendsSlice.getInitialState(),
    [gamesApi.reducerPath]: gamesApi.reducer(undefined, { type: "unknown" }),
  };
}
