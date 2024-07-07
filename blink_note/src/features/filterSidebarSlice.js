import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: "active", // Possible values: 'active', 'archived'
  isSidebarActive: false,
  isSidebarPinned: false,

  view: "grid_view", // Possible values: 'grid_view', 'list_view'
};

const filterSidebarSlice = createSlice({
  name: "filterSidebar",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    toggleSidebar: (state, action) => {
      if (action.payload?.pin) {
        state.isSidebarPinned = action.payload.pin === "pin" ? true : false;
      }
      state.isSidebarActive = !state.isSidebarActive;
    },
    toggleView: (state, action) => {
      state.view = action.payload;
    },
  },
});

export const { setFilter, toggleSidebar, toggleView } =
  filterSidebarSlice.actions;
export default filterSidebarSlice.reducer;
