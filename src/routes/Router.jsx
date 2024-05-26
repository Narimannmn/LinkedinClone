// Router.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import AppRoute from "../layout/AppRoute";
import { protectedRoutes, publicRoutes } from "./Routes";

const Router = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {protectedRoutes.map((route, idx) => (
                    <Route key={idx} path={route.path} element={<AppRoute component={route.component} />} />
                ))}
                {publicRoutes.map((route, idx) => (
                    <Route key={idx} path={route.path} element={<AppRoute component={route.component} />} />
                ))}
            </Routes>
        </Suspense>
    );
};

export default Router;
