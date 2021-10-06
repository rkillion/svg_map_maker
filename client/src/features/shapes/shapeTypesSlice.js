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
      shapeClassToggle(state,action) {
        const shapeClass = state.entities.find(shapeClass=>shapeClass.id===action.payload)
        shapeClass.open = !shapeClass.open
      },
      shapeTypeUpdate(state,action) {
        //configure changes like this {id: 1,shape_class: 1,changes: {key1:value1, key2:value2...}}
        const shapeClass = state.entities.find(shapeClass=>shapeClass.id===action.payload.shape_class)
        const shapeType = shapeClass.shape_types.find(type=>type.id===action.payload.id)
        let fields = Object.keys(action.payload.changes)
        fields.forEach(field => {
            shapeType[field] = action.payload.change[field];
        });
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

  export const { shapeClassToggle, shapeTypeUpdate } = shapeTypesSlice.actions;
  
  export default shapeTypesSlice.reducer;