import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  takeNoteMode: 'idle', // Possible values: 'idle', 'create', 'edit'
  className: "h-34rem",
};

const takeNoteModeSlice = createSlice({
  name: "takeNoteMode",
  initialState,
  reducers: {
    setTakeNoteMode: (state, action) => {
      state.takeNoteMode = action.payload;
    },
    setclassName: (state, action) => {
      state.className = action.payload || "h-34rem";
    },
  },
});

export const { setTakeNoteMode, setclassName } = takeNoteModeSlice.actions;
export default takeNoteModeSlice.reducer;
