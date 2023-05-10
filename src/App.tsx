import React from "react";
import {Provider} from "react-redux";
import store from "./redux/store";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

const Home = React.lazy(() => import("./components/Home/Home"));

const App = () => {
    return (
        <Provider store={store}>
            <React.Suspense fallback={<LoadingSpinner />}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </BrowserRouter>
            </React.Suspense>
        </Provider>
    );
}

export default App;
