import { createSlice } from "@reduxjs/toolkit";

 const textContentSlice = createSlice({
   name: 'textContents',
   initialState: [],
   reducers: {
     setTextContents(state, action) {
      const { contents } = action.payload;
      return [
        ...contents
      ]
     },
     addTextContents(state, action) {
       const { textLine } = action.payload;
       state.push(textLine);
     },
     removeTextContents(state) {
       state.pop();
     }
   }
 });

export const { setTextContents, addTextContents, removeTextContents } = textContentSlice.actions;

export default textContentSlice.reducer;