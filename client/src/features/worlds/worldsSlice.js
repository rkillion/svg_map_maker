import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//maybe write fetches here

// export const fetchCats = createAsyncThunk("cats/fetchCats", () => {
//     // return a Promise containing the data we want
//     return fetch("https://learn-co-curriculum.github.io/cat-api/cats.json")
//       .then((response) => response.json())
//       .then((data) => data.images);
//   });

const initialState = {
    entities: ["test"], // array of worlds belonging to the user
    status: "idle", // loading state
  };

const worldsSlice = createSlice({
    name: "worlds",
    initialState,
    reducers: {
      worldAdded(state, action) {
        // using createSlice lets us mutate state!
        state.entities.push(action.payload);
      },
      worldUpdated(state, action) {
        const world = state.entities.find((world) => world.id === action.payload.id);
        world[action.payload.field] = action.payload.value;
      }
    },
      // async actions
      extraReducers: {
        // [fetchCats.pending](state) {
        //   state.status = "loading";
        // },
        // [fetchCats.fulfilled](state, action) {
        //   state.entities = action.payload;
        //   state.status = "idle";
        // }
      }
  });
  
  export const { worldAdded, worldUpdated } = worldsSlice.actions;
  
  export default worldsSlice.reducer;