import { createSlice } from "@reduxjs/toolkit";
export const tagsSlice = createSlice({
  name: "tag",
  initialState: {
    isTagOpen: "homepage",
    type: "",
  },
  reducers: {
    changlePost: (state, action) => {
      state.isTagOpen = action.payload;
    },

    handleType: (state, action) => {
      state.type = action.payload;
    },
  },
});
export const { changlePost, handleType } = tagsSlice.actions;
export default tagsSlice.reducer;
