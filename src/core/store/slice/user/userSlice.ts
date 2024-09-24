import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  _id: string | undefined;
  email: string | undefined;
  username: string | undefined;
  avatar?: string;
  likedGames: number[];
  playedGames: number[];
}

export const initialState: UserState = {
  _id: undefined,
  email: undefined,
  username: undefined,
  avatar: undefined,
  likedGames: [],
  playedGames: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Omit<UserState, "likedGames" | "playedGames">>) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.avatar = action.payload.avatar;
    },
    clearUser: (state) => {
      state.email = undefined;
      state.username = undefined;
      state.avatar = undefined;
    },
    setLikedGames: (state, action: PayloadAction<number[]>) => {
      state.likedGames = action.payload || [];
    },
    setPlayedGames: (state, action: PayloadAction<number[]>) => {
      state.playedGames = action.payload || [];
    },
    addLikedGame: (state, action: PayloadAction<number>) => {
      if (!state.likedGames.includes(action.payload)) {
        state.likedGames.push(action.payload);
      }
    },
    removeLikedGame: (state, action: PayloadAction<number>) => {
      state.likedGames = state.likedGames.filter((id) => id !== action.payload);
    },
    addPlayedGame: (state, action: PayloadAction<number>) => {
      if (!state.playedGames.includes(action.payload)) {
        state.playedGames.push(action.payload);
      }
    },
    removePlayedGame: (state, action: PayloadAction<number>) => {
      state.playedGames = state.playedGames.filter((id) => id !== action.payload);
    },
  },
});

export const {
  setUser,
  clearUser,
  setLikedGames,
  setPlayedGames,
  addLikedGame,
  removeLikedGame,
  addPlayedGame,
  removePlayedGame,
} = userSlice.actions;
