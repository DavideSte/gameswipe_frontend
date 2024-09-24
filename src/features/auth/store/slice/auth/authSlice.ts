import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  verifyAccessToken,
  logout as logoutEndpoint,
  verifyEmail,
} from "../../api/gamesApi";

enum AuthStatus {
  idle = "idle",
  loading = "loading",
  succeeded = "succeeded",
  failed = "failed",
}

interface AuthState {
  isLogged: boolean;
  status: AuthStatus;
  hasLoggedOut?: boolean;
}

const initialState: AuthState = {
  isLogged: false,
  status: AuthStatus.idle,
  hasLoggedOut: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loading: (state) => {
      state.status = AuthStatus.loading;
    },
    loginSuccess: (state) => {
      state.isLogged = true;
      state.status = AuthStatus.succeeded;
      state.hasLoggedOut = false;
    },
    loginFailed: (state) => {
      state.status = AuthStatus.failed;
      state.isLogged = false;
      state.hasLoggedOut = false;
    },
    logout: (state) => {
      state.status = AuthStatus.idle;
      state.isLogged = false;
      state.hasLoggedOut = true;
    },
  },
  extraReducers: (builder) => {
    // login endpoint
    builder.addMatcher(login.matchPending, (state) => {
      authSlice.caseReducers.loading(state);
    });
    builder.addMatcher(login.matchFulfilled, (state) => {
      authSlice.caseReducers.loginSuccess(state);
    });
    builder.addMatcher(login.matchRejected, (state) => {
      authSlice.caseReducers.loginFailed(state);
    });
    // verify access token endpoint
    builder.addMatcher(verifyAccessToken.matchPending, (state) => {
      authSlice.caseReducers.loading(state);
    });
    builder.addMatcher(verifyAccessToken.matchFulfilled, (state) => {
      authSlice.caseReducers.loginSuccess(state);
    });
    builder.addMatcher(verifyAccessToken.matchRejected, (state) => {
      authSlice.caseReducers.loginFailed(state);
    });
    // logout endpoint
    builder.addMatcher(logoutEndpoint.matchPending, (state) => {
      authSlice.caseReducers.loading(state);
    });
    builder.addMatcher(logoutEndpoint.matchFulfilled, (state) => {
      authSlice.caseReducers.logout(state);
    });
    builder.addMatcher(logoutEndpoint.matchRejected, (state) => {
      authSlice.caseReducers.logout(state);
    });
    // verify email endpoint
    builder.addMatcher(verifyEmail.matchPending, (state) => {
      authSlice.caseReducers.loading(state);
    });
    builder.addMatcher(verifyEmail.matchFulfilled, (state) => {
      authSlice.caseReducers.loginSuccess(state);
    });
    builder.addMatcher(verifyEmail.matchRejected, (state) => {
      authSlice.caseReducers.loginFailed(state);
    });
  },
});

export const { loading, loginSuccess, loginFailed, logout } = authSlice.actions;
