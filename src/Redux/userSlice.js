import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      bio: "",
      email: "",
      image: "",
      token: "",
      username: "",
    },
  },
  reducers: {
    updateUserData: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { updateUserData } = userSlice.actions;
export default userSlice.reducer;
