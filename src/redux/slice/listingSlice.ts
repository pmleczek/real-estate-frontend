import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface State {
    count: number;
}

const initialState: State = {
    count: 0,
}

const listingSlice = createSlice({
    name: "listing",
    initialState,
    reducers: {
        setCount: (state, action: PayloadAction<number>) => {
            state.count = action.payload;
        },
    },
});

export const { setCount } = listingSlice.actions;
export default listingSlice.reducer;
