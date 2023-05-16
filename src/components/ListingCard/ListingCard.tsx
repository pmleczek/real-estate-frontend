import React from "react";
import { Listing } from "../ListingDisplay/ListingDisplay";
import {useNavigate} from "react-router-dom";

interface Props {
    listing: Listing;
}

const ListingCard = ({ listing }: Props) => {
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        navigate(`/listing/${listing._id}`);
    }

    return (
        <div onClick={handleClick} className="listing-card border-light-gray radius-05 pointer w-full">
            <img className="radius-top-05" alt="Property photo" />
            <p>{listing.address}</p>
            <p>${listing.price}</p>
        </div>
    );
}

export default ListingCard;
