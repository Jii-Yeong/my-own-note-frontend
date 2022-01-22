import { LoginInfo } from "$src/service/types/user";
import { login } from "$src/service/user.api";
import { createAsyncThunk, createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { ValidationErrors } from "../types/root";
import { USER_INFO } from "../types/user";

export const logInPage = createAsyncThunk<USER_INFO, LoginInfo, { rejectValue: ValidationErrors }>('/userInfo/login', async (info, { rejectWithValue }) => {
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

const initialState = {
  id: null,
  nickname: '',
  pageName: '',
  error: '',
  isAdditingPage: false,
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
      const { id, nickname } = payload;
      state.id = id;
      state.nickname = nickname
    }),
    builder.addCase(logInPage.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error.message;
      }
    })
  }
})

export const { setAdditingPageMode, setReadingPageMode, logoutUser } = userSlice.actions;

export default userSlice.reducer;