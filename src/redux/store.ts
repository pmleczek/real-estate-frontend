import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slice/searchSlice";
import listingReducer from "./slice/listingSlice";

const store = configureStore({
    reducer: {
        search: searchReducer,
        listing: listingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
