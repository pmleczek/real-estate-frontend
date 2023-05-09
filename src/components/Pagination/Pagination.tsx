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
                    <button onClick={() => handleSetPage(1)}
                            className={(page == 1 ? "inactive bg-primary text-white" : "") + " pagination-button"}>
                        1
                    </button>
                    {page - 1 > 2 && (
                        <button className="pagination-button inactive">...</button>
                    )}
                    {page - 1 > 1 && (
                        <button onClick={() => handleSetPage(page - 1)}
                                className="pagination-button">{page - 1}</button>
                    )}
                    {(page != 1 && page != props.pages) && (
                        <button className="pagination-button inactive bg-primary text-white">{page}</button>
                    )}
                    {page + 1 < props.pages && (
                        <button onClick={() => handleSetPage(page + 1)}
                                className="pagination-button">{page + 1}</button>
                    )}
                    {page + 1 < props.pages - 1 && (
                        <button className="pagination-button inactive">...</button>
                    )}
                    <button onClick={() => handleSetPage(props.pages)}
                            className={(page == props.pages ? "inactive bg-primary text-white" : "") + " pagination-button"}>
                        {props.pages}
                    </button>
                    <button onClick={handleNextPage} className="pagination-button">&gt;</button>
                </div>
            )}
        </div>
    );
}

export default Pagination;
