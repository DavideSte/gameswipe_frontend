import { Friendship } from "@/core/store/api/gamesApi/types";
import { getFriendships } from "../../api/gamesApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FriendsState {
  friendships: Friendship[];
  error: string;
  loading: boolean;
}

const initialState: FriendsState = {
  friendships: [],
  error: "",
  loading: false,
};

export const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setFriends: (state, action: PayloadAction<Friendship[]>) => {
      state.friendships = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(getFriendships.matchPending, (state) => {
      state.loading = true;
    });
    builder.addMatcher(getFriendships.matchFulfilled, (state, payload) => {
      state.loading = false;
      friendsSlice.caseReducers.setFriends(state, payload);
    });
    builder.addMatcher(getFriendships.matchRejected, (state) => {
      state.loading = false;
      state.error = "Failed to fetch friends";
      state.friendships = [];
    });
  },
});
