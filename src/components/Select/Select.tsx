import React, {useEffect, useRef, useState} from "react";
import useClickOutside from "../../hooks/useClickOutside";

interface SelectOption {
    value: string;
    title: string;
}

interface Props {
    initialValue: string;
    options: SelectOption[];
    onChange?: (newValue: string | null) => void;

}

const Select = (props: Props) => {
    const [selectedValue, setSelectedValue] = useState<string | null>(props.initialValue);
    const [show, setShow] = useState<boolean>(false);

    const handleClickOutside = () => {
        setShow(false);
    }

    const ref = useRef(null);
    useClickOutside({ ref, callback: handleClickOutside });

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target instanceof Element) {
            setSelectedValue(e.target.getAttribute("data-value"));
            if (props.onChange) {
                props.onChange(e.target.getAttribute("data-value"));
            }
        }
    }

    useEffect(() => {
        setSelectedValue(props.initialValue);
    }, [props.initialValue]);

    return (
        <div onClick={() => setShow(!show)} ref={ref} className="select border-light-gray px-1 pointer">
            <div>{props.options.filter(option => option.value === selectedValue)[0].title}</div>
            {show ? (
                <div className="absolute" onClick={handleClick}>
                    {props.options.filter(option => option.value !== selectedValue).map(option => (
                        <div data-value={option.value} key={option.value}>{option.title}</div>
                    ))}
                </div>
            ) : null}
        </div>
    );
}

export default Select;
