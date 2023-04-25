import React, {useEffect, useState} from "react";

const useScreenWidth = (breakpoint: number) => {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const handleResize = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width >= breakpoint;
}

export default useScreenWidth;
