import { LoginInfo } from "$src/service/types/user";
import { login } from "$src/service/user.api";
import { createAsyncThunk, createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { ValidationErrors } from "../types/root";
import { USER_INFO } from "../types/user";

export const logInPage = createAsyncThunk<
USER_INFO,
LoginInfo,
{
  rejectValue: ValidationErrors
}
>('/userInfo/login', async (info, { rejectWithValue }) => {
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
  id: '',
  nickname: '',
  pageName: '',
  error: '',
}

const userSlice = createSlice<USER_INFO, SliceCaseReducers<USER_INFO>, 'userInfo'>({
  name: 'userInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logInPage.fulfilled, (state, { payload }) => {
      const { id } = payload;
      state.id = id;
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

export default userSlice.reducer;