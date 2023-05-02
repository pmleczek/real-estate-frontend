import React, {useState} from "react";
import "./Pagination.css";

interface Props {
    pages: number;
    callback?: (newPage: number) => void;
}

const Pagination = (props: Props) => {
    const [page, setPage] = useState<number>(1);

    const handlePreviousPage = (e: React.MouseEvent<HTMLButtonElement>) => {
        setPage(Math.max(page - 1, 1));
        if (props.callback) {
            props.callback(Math.max(page - 1, 1))
        }
    }

    const handleNextPage = (e: React.MouseEvent<HTMLButtonElement>) => {
        setPage(Math.min(page + 1, props.pages));
        if (props.callback) {
            props.callback(Math.min(page + 1, props.pages));
        }
    }

    const handleSetPage = (newPage: number) => {
        setPage(newPage);
        if (props.callback) {
            props.callback(newPage);
        }
    }

    return (
        <div className="flex items-center content-center">
            {props.pages > 1 && (
                <div className="border-light-gray">
                    <button onClick={handlePreviousPage} className="pagination-button">&lt;</button>
                    <button className="pagination-button">{page}</button>
                    <button onClick={handleNextPage} className="pagination-button">&gt;</button>
                </div>
            )}
        </div>
    );
}

export default Pagination;
