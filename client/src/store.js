import { configureStore } from "@reduxjs/toolkit";
// import all your reducers from the slice files
import worldsReducer from './features/worlds/worldsSlice.js'
import userReducer from './features/auth/userSlice.js'
import universesReducer from './features/universes/universesSlice'
import gridsReducer from './features/tiles/gridsSlice'

const store = configureStore({
  reducer: {
    grids: gridsReducer,
    universes: universesReducer,
    user: userReducer,
    worlds: worldsReducer
  },
});

export default store;