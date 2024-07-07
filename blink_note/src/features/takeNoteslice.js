import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  takeNoteMode: 'idle', // Possible values: 'idle', 'create', 'edit'
  heading: "",
  body: ""
};

const takeNoteModeSlice = createSlice({
  name: "takeNoteMode",
  initialState,
  reducers: {
    setTakeNoteMode: (state, action) => {
      state.takeNoteMode = action.payload;
    }
  },
});

export const { setTakeNoteMode } = takeNoteModeSlice.actions;
export default takeNoteModeSlice.reducer;
