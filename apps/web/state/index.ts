import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//2states - dark-light mode, open-closed sidebar - stored in global store
export type initialStateTypes = {
  isSideBarCollapsed: boolean;
  isDarkMode: boolean;
};

const initialState: initialStateTypes = {
  isSideBarCollapsed: false,
  isDarkMode: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    //prefix the reducer name with set with the property it is changing
    //setIsSideBarCollapsed - the fn that changes the state
    setIsSideBarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSideBarCollapsed = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});
export const { setIsSideBarCollapsed, setIsDarkMode } = globalSlice.actions;
export default globalSlice.reducer;
