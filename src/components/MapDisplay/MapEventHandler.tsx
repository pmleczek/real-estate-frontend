import React from "react";
import {useMapEvents} from "react-leaflet";
import {useDispatch} from "react-redux";
import {setCoordinates, setRange} from "../../redux/slice/searchSlice";

const MapEventHandler = () => {
    const dispatch = useDispatch();

    const updateRange = (zoom: number) => {
        if (zoom < 14) {
            dispatch(setRange(2_500 + ((14 - zoom) * 2_500)));
        }
    }

    useMapEvents({
        zoomend: event => {
            updateRange(event.target.getZoom());
        },
        dragend: event => {
            dispatch(setCoordinates([
                event.target.getCenter().lat,
                event.target.getCenter().lng
            ]));
        },
    });

    // const map = useMapEvent("dragend", () => {
    //     dispatch(setCoordinates([map.getCenter().lat, map.getCenter().lng]));
    // });
    return null;
}

export default MapEventHandler;
