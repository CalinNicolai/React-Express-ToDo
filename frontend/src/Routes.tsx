import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import AuthPage from "./components/Auth/AuthPage";

const Routes: React.FC = () => {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomePage/>,
        },
        {
            path: '/auth',
            element: <AuthPage/>,
        }
    ])

    return(
        <RouterProvider router={router}/>
    )
}

export default Routes
