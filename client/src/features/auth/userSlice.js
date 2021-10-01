import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//maybe write fetches here

// export const fetchCats = createAsyncThunk("cats/fetchCats", () => {
//     // return a Promise containing the data we want
//     return fetch("https://learn-co-curriculum.github.io/cat-api/cats.json")
//       .then((response) => response.json())
//       .then((data) => data.images);
//   });

const initialState = {
    current: {}, // user data
    status: "idle", // loading state
  };

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      userUpdate(state, action) {
        state.current = action.payload;
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
  
  export const { userUpdate } = userSlice.actions;
  
  export default userSlice.reducer;