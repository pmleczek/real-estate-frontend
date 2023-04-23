import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
    return (
        <div className="h-100vh flex items-center content-center">
            <span className="spinner"></span>
        </div>
    );
};

export default LoadingSpinner;
