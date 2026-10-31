import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PreferencesState {
  currency: "USD" | "INR";
  reducedMotion: boolean;
  sidebarCollapsed: boolean;
  aiPanelOpen: boolean;
}

const initialState: PreferencesState = {
  currency: "USD",
  reducedMotion: false,
  sidebarCollapsed: false,
  aiPanelOpen: false,
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setCurrency(state, action: PayloadAction<PreferencesState["currency"]>) {
      state.currency = action.payload;
    },
    setReducedMotion(state, action: PayloadAction<boolean>) {
      state.reducedMotion = action.payload;
    },
    toggleSidebarCollapsed(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setAiPanelOpen(state, action: PayloadAction<boolean>) {
      state.aiPanelOpen = action.payload;
    },
  },
});

export const { setCurrency, setReducedMotion, toggleSidebarCollapsed, setAiPanelOpen } = preferencesSlice.actions;
export default preferencesSlice.reducer;
