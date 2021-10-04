import { configureStore } from "@reduxjs/toolkit";
// import all your reducers from the slice files
import worldsReducer from './features/worlds/worldsSlice.js'
import userReducer from './features/auth/userSlice.js'
import universesReducer from './features/universes/universesSlice'
import gridsReducer from './features/tiles/gridsSlice'
import viewReducer from "./features/viewport/viewSlice.js";
import shapeTypesReducer from "./features/shapes/shapeTypesSlice.js";

const store = configureStore({
  reducer: {
    grids: gridsReducer,
    shapeTypes: shapeTypesReducer,
    universes: universesReducer,
    user: userReducer,
    view: viewReducer,
    worlds: worldsReducer
  },
});

export default store;