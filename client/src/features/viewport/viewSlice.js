import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    current: {},
    tileFocus: {},
    userFocus: {},
    status: "idle", // loading state
  };

const viewSlice = createSlice({
    name: "view",
    initialState,
    reducers: {
      changeView(state, action) {
        // using createSlice lets us mutate state!
        state.current = action.payload;
      },
      changeFocus(state, action) {
        // using createSlice lets us mutate state!
        state.tileFocus = action.payload;
      },
      changeUserFocus(state, action) {
        // using createSlice lets us mutate state!
        state.userFocus = action.payload;
      }
    },
      // async actions
      extraReducers: {
      }
  });

  export const { changeView, changeFocus, changeUserFocus } = viewSlice.actions;

  export default viewSlice.reducer

