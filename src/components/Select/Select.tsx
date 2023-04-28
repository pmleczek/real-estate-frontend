import React, {useEffect, useRef, useState} from "react";
import "./Select.css";
import useClickOutside from "../../hooks/useClickOutside";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import ChevronUpIcon from "../icons/ChevronUpIcon";

interface SelectOption {
    value: string;
    title: string;
}

interface Props {
    initialValue: string;
    options: SelectOption[];
    onChange?: (newValue: string | null) => void;
    id?: string;

}

const Select = (props: Props) => {
    const [selectedValue, setSelectedValue] = useState<string | null>(props.initialValue);
    const [show, setShow] = useState<boolean>(false);

    const handleClickOutside = () => {
        setShow(false);
    }

    const ref = useRef(null);
    useClickOutside({ref, callback: handleClickOutside});

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
        <div id={props.id} onClick={() => setShow(!show)} ref={ref}
             className="select relative pointer">
            <div className={`${show ?
                "border-bottom-ts" :
                "radius-bottom-05 border-bottom-light-gray"} flex radius-top-05 items-center content-between px-1 border-right-light-gray border-left-light-gray border-top-light-gray`}>
                <span>{props.options.filter(option => option.value === selectedValue)[0].title}</span>
                {show ? <ChevronUpIcon/> : <ChevronDownIcon/>}
            </div>
            {show ? (
                <div className="absolute w-full radius-bottom-05 bg-white" onClick={handleClick}>
                    {props.options.filter(option => option.value !== selectedValue).map(option => (
                        <div className="select-option px-1 w-full border-left-light-gray border-right-light-gray" data-value={option.value}
                             key={option.value}>{option.title}
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
}

export default Select;
