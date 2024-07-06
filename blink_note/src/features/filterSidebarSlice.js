import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: "active", // Possible values: 'active', 'archived'
  isSidebarActive: false,
  isSidebarPinned: false,
};

const filterSidebarSlice = createSlice({
  name: "filterSidebar",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      console.log(action)
      state.filter = action.payload;
    },
    toggleSidebar: (state, action) => {
      if (action.payload?.pin) {
        state.isSidebarPinned = action.payload.pin === "pin" ? true : false;
      }
      state.isSidebarActive = !state.isSidebarActive;
    },
  },
});

export const { setFilter, toggleSidebar } = filterSidebarSlice.actions;
export default filterSidebarSlice.reducer;
