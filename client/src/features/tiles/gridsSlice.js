import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Tile from "./Tile";

export const fetchGrids = createAsyncThunk("grids/fetchGrids", (id) => {
    // return a Promise containing the data we want
    return fetch(`/grids/${id}`)
      .then((response) => response.json())
      .then((data) => data);
  });

export const postMapEdits = createAsyncThunk("grids/postMapEdits", (pendingChanges) => {
  // return a Promise containing the data we want
  return fetch(`/mapedits`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pendingChanges)
  })
    .then((response) => response.json())
    .then((data) => data);
});

const initialState = {
    primary: {}, // array of worlds belonging to the user
    editingMode: {
      mode: null,
      featureTitle: null
    },
    pendingChanges: {add: [],edit: []},
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
      //{direction: "center",shape: {}}
      addShape(state,action) {
        state.primary.tiles[action.payload.direction].shapes.push(action.payload.shape);
        state.pendingChanges.add.push(action.payload.shape);
      },
      //{direction: "center",shape: {}}
      changeShapeArray(state,action) {
        let tile = state.primary.tiles[action.payload.direction];
        state.primary.tiles[action.payload.direction].shapes.find(shape=>shape.feature.title===action.payload.feature).path_array = action.payload.path_array
        let newShapeToChange = state.pendingChanges.add.find(shape=>shape.tile_id===tile.id&&shape.feature.title===action.payload.feature);
        if (newShapeToChange) {
          newShapeToChange.path_array = action.payload.path_array;
        } else {
          let existingShapeToChange = state.pendingChanges.edit.find(shape=>shape.tile_id===tile.id&&shape.feature.title===action.payload.feature);
          if (existingShapeToChange) {
            existingShapeToChange.path_array = action.payload.path_array;
          } else {
            let shapeToAddToEdits = JSON.parse(JSON.stringify(tile.shapes.find(shape=>shape.feature.title===action.payload.feature)));
            shapeToAddToEdits.path_array = action.payload.path_array;
            state.pendingChanges.edit.push(shapeToAddToEdits);
          }
        }
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
        },
        [postMapEdits.pending](state) {
          state.status = "loading";
        },
        [postMapEdits.fulfilled](state, action) {
          state.status = "idle";
        }
      }
  });

  export const { changeEditingMode, addPendingChange, addShape, changeShapeArray } = gridsSlice.actions

  export default gridsSlice.reducer;