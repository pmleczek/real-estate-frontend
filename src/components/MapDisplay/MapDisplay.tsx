import React, {useEffect, useState} from "react";
import "./MapDisplay.css";
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import DragHandler from "./DragHandler";
import StateHandler from "./StateHandler";
import {divIcon} from "leaflet";
import {useNavigate} from "react-router-dom";
import {Location} from "../ListingDisplay/ListingDisplay";
import {fetchListingMarkerData} from "../../api/calls";

interface Listing {
    _id: string;
    location: Location;
    price: number;
}

const MapDisplay = () => {
    const [listings, setListings] = useState<Listing[]>([]);
    const searchState = useSelector((state: RootState) => state.search);
    const navigate = useNavigate();

    useEffect(() => {
        fetchListingMarkerData(searchState)
            .then(body => setListings(body.data.listings));
    }, [searchState]);

    return (
        <div className="w-half pl-3 pb-1">
            <MapContainer className="radius-1" center={[searchState.lat, searchState.lon]} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <DragHandler/>
                <StateHandler/>
                {listings.map(listing => (
                    <Marker key={listing._id}
                            position={[listing.location.coordinates[1], listing.location.coordinates[0]]}
                            eventHandlers={{
                                click: e => navigate(`/listing/${listing._id}`),
                            }}
                            icon={divIcon({
                                html: "<div></div>",
                                className: "bg-primary h-2 w-2 radius-1",
                            })}
                    />
                ))}
            </MapContainer>
        </div>
    );
}

export default MapDisplay;
