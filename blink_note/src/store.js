import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./features/noteSlice";
import filterSidebarReducer from "./features/filterSidebarSlice";
import takeNoteModeReducer from "./features/takeNoteslice";

export const store = configureStore({
  reducer: {
    notes: noteReducer,
    filterSidebar: filterSidebarReducer,
    takeNote: takeNoteModeReducer,
  },
});
