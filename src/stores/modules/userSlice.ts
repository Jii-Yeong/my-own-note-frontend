import { UserRequest } from "$src/service/types/user";
import { login, register } from "$src/service/user.api";
import { createAsyncThunk, createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { ValidationErrors } from "../types/root";
import { USER_INFO } from "../types/user";

export const logInPage = createAsyncThunk<USER_INFO, UserRequest, { rejectValue: ValidationErrors }>('/userInfo/login', async (info, { rejectWithValue }) => {
  try {
    const data = await login(info);
    return data;
  } catch (err: any) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
})

export const registerInPage = createAsyncThunk<void, UserRequest, { rejectValue: ValidationErrors }>('/userInfo/register', async (info, { rejectWithValue }) => {
  try {
    await register(info);
  } catch (err: any) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
})

const initialState = {
  id: null,
  nickname: '',
  pageName: '',
  isAdditingPage: false,
  loginError: '',
  error: '',
}

const userSlice = createSlice<USER_INFO, SliceCaseReducers<USER_INFO>, 'userInfo'>({
  name: 'userInfo',
  initialState,
  reducers: {
    setAdditingPageMode(state, _) {
      state.isAdditingPage = true;
    },
    setReadingPageMode(state, _) {
      state.isAdditingPage = false;
    },
    logoutUser(state, _) {
      state.id = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(logInPage.fulfilled, (state, { payload }) => {
      const { id, nickname, loginError } = payload;
      state.id = id;
      state.nickname = nickname;
      state.loginError = loginError;
    }),
    builder.addCase(logInPage.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error.message;
      }
    }),
    builder.addCase(registerInPage.fulfilled, (state, { payload }) => {

    })
  }
})

export const { setAdditingPageMode, setReadingPageMode, logoutUser } = userSlice.actions;

export default userSlice.reducer;