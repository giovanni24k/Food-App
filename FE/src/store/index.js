import { configureStore } from "@reduxjs/toolkit";

import foodStoreSlice from "./food-store-slice";

const store = configureStore({
  reducer: { foodStore: foodStoreSlice.reducer },
});

export default store;
