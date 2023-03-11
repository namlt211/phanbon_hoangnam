import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userSlice from "../slice/userSlice";

const rootReducer = combineReducers({ user: userSlice });

// export const store = configureStore({
//   reducer: rootReducer,
// });
export default configureStore({
  reducer: rootReducer,
});
