import React, {useEffect, useState} from "react";
import "./ListingDisplay.css";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import Pagination from "../Pagination/Pagination";
import ListingCard from "../ListingCard/ListingCard";
import {fetchListingCountBySearchState, fetchListingsBySearchState} from "../../api/calls";
import {Listing} from "../../types";

const ListingDisplay = () => {
    const [listings, setListings] = useState<Listing[]>([]);
    const [count, setCount] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const searchState = useSelector((state: RootState) => state.search);

    const handlePageUpdate = (newPage: number) => {
        setPage(newPage - 1);
    }

    useEffect(() => {
        fetchListingsBySearchState(searchState, page)
            .then(body => {
                setListings(body.data.listings);
            })
            .catch(error => console.log(error));
        fetchListingCountBySearchState(searchState, page)
            .then(body => setCount(body.data.listingCount))
            .catch(error => console.log(error));
    }, [searchState, page]);

    return (
        <div className="listing-display w-half px-3 pb-15 flex flex-column">
            <div className="flex pb-15">
                <h1 className="weight-500">{count} properties
                    found {searchState.locationName !== "" ? "in " + searchState.locationName : ""}
                </h1>
            </div>
            <div className="card-container pb-1 flex-1">
                {listings.map(listing => (
                    <ListingCard key={listing._id} listing={listing} />
                ))}
            </div>
            <Pagination pages={Math.ceil(count / 12)} callback={handlePageUpdate} />
        </div>
    );
}

export default ListingDisplay;
