import { configureStore } from '@reduxjs/toolkit';
import noteReducer from './features/noteSlice';
import filterSidebarReducer from './features/filterSidebarSlice';

export const store = configureStore({
  reducer: {
    notes: noteReducer,
    filterSidebar: filterSidebarReducer,
  },
});