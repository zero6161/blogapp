import { createSlice } from "@reduxjs/toolkit";
export const postSlice = createSlice({
  name: "open",
  initialState: {
    post: "old",
  },
  reducers: {
    upDatePost: (state, action) => {
      state.post = action.payload;
    },
  },
});
export const { upDatePost } = postSlice.actions;
export default postSlice.reducer;
