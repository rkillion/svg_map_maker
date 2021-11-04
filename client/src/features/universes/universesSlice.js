import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUniverses = createAsyncThunk("universes/fetchUniverses", () => {
    // return a Promise containing the data we want
    return fetch("/universes")
      .then((response) => response.json())
      .then((data) => data);
  });

export const postUniverse = createAsyncThunk("universes/postUniverse", (postConfig) => {
  // return a Promise containing the data we want
  return fetch("/universes",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postConfig)
  })
    .then((response) => response.json())
    .then((data) => data);
});

const initialState = {
    entities: [], // array of universes belonging to the user
    status: "idle", // loading state
  };

const universesSlice = createSlice({
    name: "universes",
    initialState,
    reducers: {
      universeAdded(state, action) {
        // using createSlice lets us mutate state!
        state.entities.push(action.payload);
      },
      universeUpdated(state, action) {
        //configure changes like this {id: 1,changes: {key1:value1, key2:value2...}}
        const universe = state.entities.find((universe) => universe.id === action.payload.id);
        let fields = Object.keys(action.payload.changes)
        fields.forEach(field => {
            universe[field] = action.payload.change[field];
        });
      }
    },
      // async actions
      extraReducers: {
        [fetchUniverses.pending](state) {
          state.status = "loading";
        },
        [fetchUniverses.fulfilled](state, action) {
          state.entities = action.payload;
          state.status = "idle";
        },
        [postUniverse.pending](state) {
          state.status = "loading";
        },
        [postUniverse.fulfilled](state, action) {
          state.entities.push(action.payload);
          state.status = "idle";
        }
      }
  });
  
  export const { universeAdded, universeUpdated } = universesSlice.actions;
  
  export default universesSlice.reducer;