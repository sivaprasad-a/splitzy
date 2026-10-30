import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Single RTK Query root; feature APIs inject endpoints into this instance
// so the whole app shares one cache and one set of tag types.
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Circle", "Expense", "PersonalTransaction", "SavingsScenario"],
  endpoints: () => ({}),
});
