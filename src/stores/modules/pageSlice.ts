import { createAsyncThunk, createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { PAGE } from "../types/page";
import { getAllPageList } from '$src/service/page-list.api'
import { AxiosError } from 'axios';
import { PAGE_LIST } from "$src/types/page";

type ValidationErrors = {
  errorMessage: string;
  field_errors: Record<string, string>
}

export const selectAllPageList = createAsyncThunk<
  Array<PAGE_LIST>,
  {},
  {
    rejectValue: ValidationErrors
  }
>('pages/select', async (_, { rejectWithValue }) => {
  try {
    const { pageList } = await getAllPageList();
    return pageList;
  } catch (err) {
    let error: AxiosError<ValidationErrors> = err;
    if (!error.response) {
      throw err;
    }
  }
  return rejectWithValue(error.response.data);
})

const initialState = {
  pageList: []
}

const pageSlice = createSlice<PAGE, SliceCaseReducers<PAGE>, 'pages'>({
  name: 'pages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(selectAllPageList.fulfilled, (state, { payload }) => {
      state.pageList = payload;
    })
    builder.addCase(selectAllPageList.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage
      } else {
        state.error = action.payload.message;
      }
    })
  }
})

export const { setPageList } = pageSlice.actions;

export default pageSlice.reducer;