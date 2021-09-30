import { configureStore } from "@reduxjs/toolkit";
// import all your reducers from the slice files
import worldsReducer from './features/worlds/worldsSlice.js'

const store = configureStore({
  reducer: {
    worlds: worldsReducer
  },
});

export default store;