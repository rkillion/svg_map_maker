import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchShapeTypes = createAsyncThunk("shapeTypes/fetchshapeTypes", () => {
    // return a Promise containing the data we want
    return fetch("/shape_classes")
      .then((response) => response.json())
      .then((data) => data);
  });

const initialState = {
    entities: [], //
    status: "idle", // loading state
  };

const shapeTypesSlice = createSlice({
    name: "shapeTypes",
    initialState,
    reducers: {
    },
      // async actions
      extraReducers: {
        [fetchShapeTypes.pending](state) {
          state.status = "loading";
        },
        [fetchShapeTypes.fulfilled](state, action) {
          state.entities = action.payload;
          state.status = "idle";
        }
      }
  });
  
  export default shapeTypesSlice.reducer;