import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import authService from "@/services/auth.service";
import { RootState } from "../store";
import { User } from "@/types";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  setUserLocalStorage,
} from "@/redux/services/persistUser.service";

export interface AuthState {
  isLoading: boolean;
  error?: any;
  userInfo: User | undefined;
}

const initialState: AuthState = {
  isLoading: false,
  userInfo: getUserFromLocalStorage(),
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    request: (state): AuthState => {
      return {
        ...state,
        isLoading: true,
      };
    },
    success: (state, action: PayloadAction<any>): AuthState => {
      return {
        ...state,
        isLoading: false,
        userInfo: action.payload,
      };
    },
    fail: (state, action: PayloadAction<any>): AuthState => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },
    logout: (state): AuthState => {
      return {
        ...state,
        isLoading: false,
        userInfo: undefined,
      };
    },
  },
});

export const authLogin = (userData: any) => async (dispatch: any) => {
  try {
    dispatch(request());
    const authData = await authService.login(userData);
    dispatch(success(authData));
    setUserLocalStorage(authData);
    return authData;
  } catch (error: any) {
    dispatch(fail(error.response.data.message));
    return error;
  }
};

export const authlogout = () => async (dispatch: any) => {
  dispatch(logout());
  removeUserFromLocalStorage();
};

export const { request, success, fail, logout } = authenticationSlice.actions;
export const selectAuthentication = (state: RootState) => state.authentication;
export const authenticationReducer = authenticationSlice.reducer;
