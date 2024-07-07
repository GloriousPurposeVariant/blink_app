import { createSlice } from "@reduxjs/toolkit";

import initialState from "./noteData";
let id = 13;

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.push({ id, state: "active", ...action.payload }); //TODO maybe create id here
      id++;
    },
    updateNote: (state, action) => {
      const index = state.findIndex((note) => note.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteNote: (state, action) => {
      return state.filter((note) => note.id !== action.payload.id);
    },
  },
});

export const { addNote, updateNote, deleteNote } = noteSlice.actions;
export default noteSlice.reducer;
