import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "./api/baseApi";
import preferencesReducer from "./slices/preferencesSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      preferences: preferencesReducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
