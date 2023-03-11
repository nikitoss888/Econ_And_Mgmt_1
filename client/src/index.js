import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './routes/Home';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, json, RouterProvider} from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./routes/ErrorPage";
import Briefs from "./routes/Briefs";
import Cookies from "js-cookie";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {path: '/', element: <Home />},
            {path: '/home', element: <Home />},
            {
                path: '/briefs',
                element: <Briefs />,
                loader: async () => {
                    let token = Cookies.get("token");

                    if (!token) {
                        throw json(
                            {
                                message: "Ви не авторизовані",
                            },
                            {
                                status: 403,
                            }
                        )
                    }
                    return await fetch("http://localhost:5000/api/brief/", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token,
                        }
                    })
                        .catch((err) => {
                            console.log(err);
                            return false;
                        });
                }
            }
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
