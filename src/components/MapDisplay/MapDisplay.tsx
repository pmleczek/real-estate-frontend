import React from "react";
import "./MapDisplay.css";
import {MapContainer, TileLayer} from "react-leaflet";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import DragHandler from "./DragHandler";

const MapDisplay = () => {
    const searchState = useSelector((state: RootState) => state.search);

    return (
        <div className="w-half pl-3 pb-1">
            <MapContainer className="radius-1" center={[searchState.lat, searchState.lon]} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <DragHandler />
            </MapContainer>
        </div>
    );
}

export default MapDisplay;
