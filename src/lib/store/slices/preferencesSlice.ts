import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PreferencesState {
  currency: "USD" | "INR";
  reducedMotion: boolean;
}

const initialState: PreferencesState = {
  currency: "USD",
  reducedMotion: false,
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
  },
});

export const { setCurrency, setReducedMotion } = preferencesSlice.actions;
export default preferencesSlice.reducer;
