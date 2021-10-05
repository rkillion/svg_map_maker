import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchWorlds = createAsyncThunk("worlds/fetchWorlds", (id) => {
    // return a Promise containing the data we want
    return fetch(`/worlds/${id}`)
      .then((response) => response.json())
      .then((data) => data);
  });

  export const postWorld = createAsyncThunk("worlds/postWorld", (postConfig) => {
    // return a Promise containing the data we want
    return fetch("/worlds",{
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
    entities: [], // array of worlds belonging to the user
    currentWorld: {},
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
        //configure changes like this {id: 1,changes: {key1:value1, key2:value2...}}
        const world = state.entities.find((world) => world.id === action.payload.id);
        let fields = Object.keys(action.payload.changes)
        fields.forEach(field => {
            world[field] = action.payload.change[field];
        });
      }
    },
      // async actions
      extraReducers: {
        [fetchWorlds.pending](state) {
          state.status = "loading";
        },
        [fetchWorlds.fulfilled](state, action) {
          state.currentWorld = action.payload;
          state.status = "idle";
        },
        [postWorld.pending](state) {
          state.status = "loading";
        },
        [postWorld.fulfilled](state, action) {
          state.currentWorld = action.payload;
          state.status = "idle";
        }
      }
  });
  
  export const { worldAdded, worldUpdated } = worldsSlice.actions;
  
  export default worldsSlice.reducer;