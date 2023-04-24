import React from "react";
import {useMapEvent} from "react-leaflet";
import {useDispatch} from "react-redux";
import {setCoordinates} from "../../redux/slice/searchSlice";

const DragHandler = () => {
    const dispatch = useDispatch();

    const map = useMapEvent("dragend", () => {
        dispatch(setCoordinates([map.getCenter().lat, map.getCenter().lng]));
    });
    return null;
}

export default DragHandler;
