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
