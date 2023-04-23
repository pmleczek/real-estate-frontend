import React from "react";
import "./Navbar.css";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar flex items-center content-between px-3 border-bottom-light-gray">
            <Link to="/">Logo</Link>
            <div className="flex items-center gap-3 weight-500">
                <button>Buy</button>
                <button>Rent</button>
                <Link to="/sell">
                    Sell
                </Link>
            </div>
            <div className="flex items-center gap-3 weight-500">
                <Link to="/login">
                    Sign in
                </Link>
                <Link to="/register">
                    Sign up
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
