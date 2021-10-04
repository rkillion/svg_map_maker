import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchGrids = createAsyncThunk("grids/fetchGrids", (id) => {
    // return a Promise containing the data we want
    return fetch(`/grids/${id}`)
      .then((response) => response.json())
      .then((data) => data);
  });

const initialState = {
    primary: {}, // array of worlds belonging to the user
    status: "idle", // loading state
};

const gridsSlice = createSlice({
    name: "grids",
    initialState,
    reducers: {
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

  export default gridsSlice.reducer;