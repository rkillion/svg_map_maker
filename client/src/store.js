import { configureStore } from "@reduxjs/toolkit";
// import all your reducers from the slice files
import worldsReducer from './features/worlds/worldsSlice.js'
import userReducer from './features/auth/userSlice.js'

const store = configureStore({
  reducer: {
    user: userReducer,
    worlds: worldsReducer
  },
});

export default store;