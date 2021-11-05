import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchShapeTypes = createAsyncThunk("shapeTypes/fetchshapeTypes", () => {
    // return a Promise containing the data we want
    return fetch("/api/shape_classes")
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
      shapeClassToggle(state,action) {
        const shapeClass = state.entities.find(shapeClass=>shapeClass.id===action.payload)
        shapeClass.open = !shapeClass.open
      },
      shapeTypeToggle(state,action) {
        //configure changes like this {id: 1,shape_class: 1}
        const shapeClass = state.entities.find(shapeClass=>shapeClass.id===action.payload.shape_class)
        const shapeType = shapeClass.shape_types.find(type=>type.id===action.payload.id)
        shapeType.open = !shapeType.open
      },
    },
      // async actions
      extraReducers: {
        [fetchShapeTypes.pending](state) {
          state.status = "loading";
        },
        [fetchShapeTypes.fulfilled](state, action) {
          state.entities = action.payload;
          state.entities.forEach(shapeClass=>{
            shapeClass.open = false;
            shapeClass.shape_types.forEach(type=>type.open=false)
          })
          state.status = "idle";
        }
      }
  });

  export const { shapeClassToggle, shapeTypeToggle } = shapeTypesSlice.actions;
  
  export default shapeTypesSlice.reducer;