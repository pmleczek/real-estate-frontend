import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {useMap} from "react-leaflet";

const StateHandler = () => {
    const map = useMap();
    const searchState = useSelector((state: RootState) => state.search);

    useEffect(() => {
        map.setView([searchState.lat, searchState.lon]);
    }, [searchState.lat, searchState.lon]);
    return null
};

export default StateHandler;
