import React, {useRef, useState} from "react";
import "./MobileNavbar.css";
import {Link} from "react-router-dom";
import useClickOutside from "../../hooks/useClickOutside";
import MenuIcon from "../icons/MenuIcon";
import CloseIcon from "../icons/CloseIcon";
import {useDispatch} from "react-redux";
import {setType} from "../../redux/slice/searchSlice";

const MobileNavbar = () => {
    const [show, setShow] = useState<boolean>(false);

    const dispatch = useDispatch();

    const handleClickOutside = () => {
        setShow(false);
    }

    const ref = useRef(null);
    useClickOutside({ ref, callback: handleClickOutside });

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setShow(!show);
    }

    const handleTypeButtonClick = (type: "buy" | "rent") => {
        setShow(false);
        dispatch(setType(type));
    }

    return (
        <div ref={ref} className="flex flex-column">
            <div className="navbar-mobile flex items-center content-between border-bottom-light-gray px-2">
                <Link to="/">Logo</Link>
                <button className="navbar-mobile-toggle" onClick={handleClick}>
                    {show ? <CloseIcon /> : <MenuIcon />}
                </button>
            </div>
            <div className={show ?
                "navbar-mobile-menu flex flex-column border-bottom-light-gray absolute w-full bg-white" :
                "none"}>
                <button onClick={() => handleTypeButtonClick("buy")} className="px-2 py-075">Buy</button>
                <button onClick={() => handleTypeButtonClick("rent")} className="px-2 py-075">Rent</button>
                <Link className="px-2 py-075" to="/sell">Sell</Link>
                <Link className="px-2 py-075" to="/login">Sign in</Link>
                <Link className="px-2 py-075" to="/register">Sign up</Link>
            </div>
        </div>
    );
}

export default MobileNavbar;
