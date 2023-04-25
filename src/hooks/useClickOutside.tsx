import React, {RefObject, useEffect} from "react";

interface Props {
    ref: RefObject<HTMLElement>;
    callback: () => void;
}

const useClickOutside = ({ ref, callback }: Props) => {
    const handleClick = (e: MouseEvent) => {
        if (ref && ref.current && !ref.current.contains(e.target as Node)) {
            callback();
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        }
    }, [ref, callback]);
}

export default useClickOutside;
