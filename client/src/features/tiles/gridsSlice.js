import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Tile from "./Tile";

export const fetchGrids = createAsyncThunk("grids/fetchGrids", (id) => {
    // return a Promise containing the data we want
    return fetch(`/grids/${id}`)
      .then((response) => response.json())
      .then((data) => data);
  });

const initialState = {
    primary: {}, // array of worlds belonging to the user
    editingMode: {
      mode: null,
      featureTitle: null
    },
    pendingChanges: [],
    status: "idle", // loading state
};

const gridsSlice = createSlice({
    name: "grids",
    initialState,
    reducers: {
      changeEditingMode(state,action) {
        state.editingMode = action.payload;
      },
      addPendingChange(state,action) {
        let exists = state.pendingChanges.find(change=>change.tileId===action.payload.tileId&&change.featureTitle===action.payload.featureTitle)
        if (!exists) {state.pendingChanges.push(action.payload)};
      },
      addShape(state,action) {
        state.primary.tiles[action.payload.direction].shapes.push(action.payload.shape);
      },
      changeShapeArray(state,action) {
        state.primary.tiles[action.payload.direction].shapes.find(shape=>shape.feature.title===action.payload.feature).pathArray = action.payload.pathArray
      }
    },
      // async actions
      extraReducers: {
        [fetchGrids.pending](state) {
          state.status = "loading";
        },
        [fetchGrids.fulfilled](state, action) {
          state.primary = action.payload;
          state.status = "idle";
        }
      }
  });

  export const { changeEditingMode, addPendingChange, addShape, changeShapeArray } = gridsSlice.actions

  export default gridsSlice.reducer;