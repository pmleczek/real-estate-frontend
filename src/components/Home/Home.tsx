import React from "react";
import "./Home.css";
import FilterRow from "../FilterRow/FilterRow";
import ListingDisplay from "../ListingDisplay/ListingDisplay";
import useScreenWidth from "../../hooks/useScreenWidth";

const Navbar = React.lazy(() => import("../Navbar/Navbar"));
const MapDisplay = React.lazy(() => import("../MapDisplay/MapDisplay"));

const MobileNavbar = React.lazy(() => import("../Navbar/MobileNavbar"));

const Home = () => {
    const isMedium = useScreenWidth(768);
    const isDesktop = useScreenWidth(1200);

    return (
        <div className="flex flex-column home-container">
            <header>
                { isMedium ? <Navbar /> : <MobileNavbar /> }
            </header>
            <main className="flex flex-column flex-1">
                <FilterRow />
                <div className="flex items-stretch flex-1">
                    { isDesktop ? <MapDisplay /> : null }
                    <ListingDisplay />
                </div>
            </main>
        </div>
    );
}

export default Home;
