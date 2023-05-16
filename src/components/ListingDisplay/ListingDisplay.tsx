import React, {useEffect, useState} from "react";
import "./ListingDisplay.css";
import {useDispatch, useSelector} from "react-redux";
import {setListings as setStoreListings} from "../../redux/slice/listingSlice";
import {RootState} from "../../redux/store";
import Pagination from "../Pagination/Pagination";
import ListingCard from "../ListingCard/ListingCard";

export interface Location {
    type?: string;
    coordinates: number[];
}

export interface Listing {
    _id: string;
    address: string;
    location: Location;
    listingType: string;
    price: number;
}

const ListingDisplay = () => {
    const [listings, setListings] = useState<Listing[]>([]);
    const [count, setCount] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const searchState = useSelector((state: RootState) => state.search);

    const dispatch = useDispatch();

    const handlePageUpdate = (newPage: number) => {
        setPage(newPage - 1);
    }

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/listing/graphql",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: `query getListings($searchInput: SearchInput!) {
                        listings(searchInput: $searchInput) {
                            _id,
                            address,
                            location {
                                coordinates,
                            },
                            listingType,
                            price,
                        }
                    }
                    `,
                    variables: {
                        searchInput: {
                            lat: searchState.lat,
                            lon: searchState.lon,
                            range: 5_000,
                            listingType: searchState.type,
                            offset: 12 * page,
                            limit: 12,
                        },
                    },
                }),
            })
            .then(res => res.json())
            .then(data => {
                setListings(data.data.listings);
                dispatch(setStoreListings(data.data.listings));
            })
            .catch(error => console.log(error));
        fetch("http://localhost:8080/api/v1/listing/graphql",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: `query getListings($searchInput: SearchInput!) {
                        listingCount(searchInput: $searchInput)
                    }
                    `,
                    variables: {
                        searchInput: {
                            lat: searchState.lat,
                            lon: searchState.lon,
                            range: 5_000,
                            listingType: searchState.type,
                            offset: 12 * page,
                            limit: 12,
                        },
                    },
                }),
            })
            .then(res => res.json())
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
