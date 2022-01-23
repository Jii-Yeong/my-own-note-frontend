import { createAsyncThunk, createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { PAGE, PAGE_CONTENT, PAGE_LIST } from "$src/types/page";
import { ValidationErrors } from "../types/root";
import { addPage, addPageContent, getAllPageList, getPageContent, removePage } from "$src/service/page.api";
import { Page, PageContentInsertRequest } from "$src/service/types/page";
import { PAGE_CONTENT_REQUEST, PAGE_STATUE } from "../types/page";

export const selectAllPageList = createAsyncThunk<PAGE_LIST, string, { rejectValue: ValidationErrors }>('pages/select', async (userInfo, { rejectWithValue }) => {
  try {
    const pageList = await getAllPageList(userInfo);
    return pageList;
  } catch (err: any) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
})

export const insertPageToUser = createAsyncThunk<PAGE_STATUE, Page, { rejectValue: ValidationErrors }>('pages/insert', async(pageInfo, { rejectWithValue }) => {
  try {
    const { pageStatus } = await addPage(pageInfo);
    return pageStatus;
  } catch (err: any) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
})

export const selectPageListToPageId = createAsyncThunk<PAGE_CONTENT, PAGE_CONTENT_REQUEST, { rejectValue: ValidationErrors }>('page/select/id', async({pageId, title}, { rejectWithValue }) => {
  try {
    const pageContent = await getPageContent(pageId, title);
    return pageContent;
  } catch (err: any) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
})

export const insertPageContent = createAsyncThunk<void, PageContentInsertRequest, { rejectValue: ValidationErrors }>('page/insert/content', async({currentPageId, textList}, { rejectWithValue }) => {
  try {
    if (currentPageId && textList.length) {
      await addPageContent(currentPageId, textList);
    }
  } catch (err: any) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
})

export const deletePage = createAsyncThunk<void, number, { rejectValue: ValidationErrors }>('page/delete/index', async(pageId, { rejectWithValue }) => {
  try {
    await removePage(pageId);
  } catch (err: any) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.data);
  }
})

const initialState = {
  pageList: {
    pages: [],
    count: 0,
  },
  currentPageId: 0,
  currentIndex: 0,
  pageContent: {},
  addPageState: {},
  error: '',
}

const pageSlice = createSlice<PAGE, SliceCaseReducers<PAGE>, 'pages'>({
  name: 'pages',
  initialState,
  reducers: {
    initPageList(state, _) {
      state.pageList = initialState.pageList;
    },
    initPageContent(state, _) {
      state.pageContent = initialState.pageContent;
    },
    initCurrentPageId(state, _) {
      state.currentPageId = 0;
    },
    setPageId(state, action) {
      const { pageId } = action.payload;
      state.currentPageId = pageId;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(selectAllPageList.fulfilled, (state, { payload }) => {
      state.pageList = payload;
    })
    builder.addCase(selectAllPageList.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage
      } else {
        state.error = action.error.message;
      }
    })
    builder.addCase(insertPageToUser.fulfilled, (state, { payload }) => {
      state.addPageState = payload;
    })
    builder.addCase(selectPageListToPageId.fulfilled, (state, { payload }) => {
      state.pageContent = payload;
    })
    builder.addCase(insertPageContent.fulfilled, (state, { payload }) => {
    })
    builder.addCase(deletePage.fulfilled, (state, { payload }) => {

    })
  }
})

export const { setPageId, initPageList, initPageContent, initCurrentPageId } = pageSlice.actions;

export default pageSlice.reducer;