import React from "react";
import "./FilterRow.css";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import LocationSearch from "../LocationSearch/LocationSearch";
import Select from "../Select/Select";
import {setType, setSortBy} from "../../redux/slice/searchSlice";

const FilterRow = () => {
    const searchState = useSelector((state: RootState) => state.search);
    const dispatch = useDispatch();

    const setSearchType = (newValue: string | null) => {
        if (newValue) {
            dispatch(setType(newValue));
        }
    }

    const setSearchSortBy = (newValue: string | null) => {
        if (newValue) {
            dispatch(setSortBy(newValue));
        }
    }

    return (
        <div className="filter-row px-3 pb-15 flex items-center content-between">
            <div className="flex items-center gap-2">
                <LocationSearch />
                <Select id="type-select" initialValue={searchState.type} options={[
                    {value: "buy", title: "For sale"},
                    {value: "rent", title: "For rent"},
                ]} onChange={setSearchType} />
            </div>
            <Select id="sortby-select" initialValue={searchState.sortBy} options={[
                {value: "recent", title: "New"},
                {value: "priceasc", title: "Price ↑"},
                {value: "pricedsc", title: "Price ↓"},
            ]} prefix="Sort by: " onChange={setSearchSortBy} />
        </div>
    );
}

export default FilterRow;
