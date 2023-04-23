import React from "react";
import {Provider} from "react-redux";
import store from "./redux/store";
import {BrowserRouter, Routes} from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

const App = () => {
    return (
        <Provider store={store}>
            <React.Suspense fallback={<LoadingSpinner />}>
                <BrowserRouter>
                    <Routes></Routes>
                </BrowserRouter>
            </React.Suspense>
        </Provider>
    );
}

export default App;
