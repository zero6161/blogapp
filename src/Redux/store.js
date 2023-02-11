import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./userSlice";
import postSlice from "./postSlice";
import tagsSlice from "./tagsSlice";
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["tag"],
};
const reducer = combineReducers({
  user: userSlice,
  reload: postSlice,
  tag: tagsSlice,
  // tag: tagSlice,
});
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [],
});
// export default configureStore({
//   reducer: {
//     post: postReducer,
//   },
// });
// export default configureStore({
//   reducer: {
//     open: openModal,
//   },
// });

export const persistor = persistStore(store);

//Normal store
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import userReducer from "./userSlice";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import userSlice from "./userSlice";
// import tagSlice from "./tagSlice";
// import postReducer from "./postSlice";
// export default configureStore({
//   reducer: {
//     user: userReducer,
//     post: postReducer,
//   },
// });
