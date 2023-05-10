import React, {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {setCoordinates, setLocationName} from "../../redux/slice/searchSlice";
import useClickOutside from "../../hooks/useClickOutside";
import {fetchLocationById, fetchLocationsByQuery} from "../../api/calls";

interface Location {
    _id: string;
    name: string;
    state: string;
}

interface FullLocation extends Location {
    coordinates: number[];
}

const LocationSearch = () => {
    const [query, setQuery] = useState<string>("");
    const [locations, setLocations] = useState<Location[]>([]);
    const [show, setShow] = useState<boolean>(false);

    const ref = useRef(null);
    useClickOutside({ref, callback: () => setShow(false)});

    const dispatch = useDispatch();

    useEffect(() => {
        if (query !== "") {
            fetchLocationsByQuery(query)
                .then(body => setLocations(body.data.locations))
                .catch(error => console.log(error));
        }
    }, [query]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target instanceof Element && e.target.getAttribute("data-id")) {
            fetchLocationById(e.target.getAttribute("data-id"))
                .then(body => {
                    dispatch(setCoordinates(body.data.location.coordinates));
                    dispatch(setLocationName(body.data.location.name + ", " + body.data.location.state));
                })
                .catch(error => console.log(error));
            setShow(false);
            setQuery("");
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    return (
        <div ref={ref} className="relative location-search">
            <input onFocus={() => setShow(true)}
                   className={`${(show && locations.length > 0) ? "radius-top-05" : "radius-05"} w-full border-light-gray px-1 py-075`}
                   placeholder="Location (e.g. Los Angeles)" value={query} onChange={handleChange}/>
            <div className={(show && query !== "") ? "dropdown w-full absolute bg-white radius-bottom-05" : "none"}
                 onClick={handleClick}>{locations.map(location => (
                <div
                    className="px-1 pointer border-bottom-light-gray border-left-light-gray border-right-light-gray"
                    data-id={location._id} key={location._id}>{location.name}, {location.state}</div>
            ))}</div>
        </div>
    );
}

export default LocationSearch;
