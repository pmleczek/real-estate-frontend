import {RootState} from "../redux/store";

export const fetchLocationById = (id: string | null) => {
    return fetch("http://localhost:8080/api/v1/location/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `query getLocationById($id: String!) {
                        location(id: $id) {
                            _id,
                            name,
                            state,
                            coordinates
                        }
                    }`,
            variables: {
                id: id,
            },
        })
    })
        .then(response => response.json());
}

export const fetchLocationsByQuery = (query: string) => {
    return fetch("http://localhost:8080/api/v1/location/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `query getLocationsBySearch($search: String!) {
                        locations(search: $search) {
                            _id,
                            name,
                            state
                        }
                    }`,
            variables: {
                search: query,
            },
        }),
    })
        .then(response => response.json());
}

export const fetchListingsBySearchState = (searchState: RootState["search"], page: number) => {
    return fetch("http://localhost:8080/api/v1/listing/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
    })
        .then(res => res.json());
}

export const fetchListingCountBySearchState = (searchState: RootState["search"], page: number) => {
    return fetch("http://localhost:8080/api/v1/listing/graphql",
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
            .then(res => res.json());
}
