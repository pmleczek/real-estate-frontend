import React, {useRef, useState} from "react";
import "./MobileNavbar.css";
import {Link} from "react-router-dom";
import useClickOutside from "../../hooks/useClickOutside";

const MobileNavbar = () => {
    const [show, setShow] = useState<boolean>(false);

    const handleClickOutside = () => {
        setShow(false);
    }

    const ref = useRef(null);
    useClickOutside({ ref, callback: handleClickOutside });

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setShow(!show);
    }

    return (
        <div ref={ref} className="flex flex-column">
            <div className="navbar-mobile flex items-center content-between border-bottom-light-gray px-2">
                <Link to="/">Logo</Link>
                <button onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                </button>
            </div>
            <div className={show ?
                "flex flex-column border-bottom-light-gray px-2 absolute navbar-mobile-menu w-full bg-white" :
                "none"}>
            </div>
        </div>
    );
}

export default MobileNavbar;
