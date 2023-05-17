import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface State {
    type: string;
    lat: number;
    lon: number;
    locationName: string;
    sortBy: string;
    range: number;
}

const initialState: State = {
    type: "buy",
    lat: 37.77120182217527,
    lon:  -122.42068719056694,
    locationName: "",
    sortBy: "recent",
    range: 2_500,
}

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setType: (state, action: PayloadAction<string>) => {
            state.type = action.payload;
        },
        setCoordinates: (state, action: PayloadAction<number[]>) => {
            if (action.payload.length === 2) {
                state.lat = action.payload[0];
                state.lon = action.payload[1];
            }
        },
        setLocationName: (state, action: PayloadAction<string>) => {
            state.locationName = action.payload;
        },
        setSortBy: (state, action: PayloadAction<string>) => {
            state.sortBy = action.payload;
        },
        setRange: (state, action: PayloadAction<number>) => {
            state.range = action.payload;
        },
    },
});

export const { setType, setCoordinates, setLocationName, setSortBy, setRange } = searchSlice.actions;

export default searchSlice.reducer;
