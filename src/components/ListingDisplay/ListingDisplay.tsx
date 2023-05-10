import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import Pagination from "../Pagination/Pagination";

interface Listing {
    _id: string;
}

const ListingDisplay = () => {
    const [listings, setListings] = useState<Listing[]>([]);
    const [page, setPage] = useState<number>(0);
    const searchState = useSelector((state: RootState) => state.search);
    const listingState = useSelector((state: RootState) => state.listing);

    const handlePageUpdate = (newPage: number) => {
        setPage(newPage - 1);
    }

    useEffect(() => {
        fetch("https://localhost:8080/api/v1/listing/graphql/",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: `query getListings($searchInput: SearchInput!) {
                        listings(searchInput: $searchInput) {
                            _id,
                            address,
                            coordinates,
                            listingType
                        }
                    }
                    `,
                    variables: {
                        searchInput: {
                            lat: searchState.lat,
                            lon: searchState.lon,
                            range: 5,
                            listingType: searchState.type,
                            offset: 12 * page,
                            limit: 12,
                        },
                    },
                }),
            })
            .then(res => res.json())
            .then(data => setListings(data))
            .catch(error => console.log(error));
    }, [searchState, page]);

    return (
        <div className="w-half px-3 pb-15 flex flex-column">
            <div className="flex pb-15">
                <h1 className="weight-500">{listingState.count} properties
                    found {searchState.locationName !== "" ? "in" + searchState.locationName : ""}
                </h1>
            </div>
            <div className="flex-1"></div>
            <Pagination pages={Math.ceil(listingState.count / 12)} callback={handlePageUpdate} />
        </div>
    );
}

export default ListingDisplay;
