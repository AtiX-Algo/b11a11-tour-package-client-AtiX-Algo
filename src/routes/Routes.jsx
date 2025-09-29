// src/routes/Routes.jsx

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllPackages from "../pages/AllPackages";
import AddPackage from "../pages/AddPackage";
import PrivateRoute from "./PrivateRoute";
import PackageDetails from "../pages/PackageDetails";
import ManageMyPackages from "../pages/ManageMyPackages";
import MyBookings from "../pages/MyBookings";
import AboutUs from "../pages/AboutUs";
import GuideRoute from "./GuideRoute"; // ✅ Make sure this is imported

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/all-packages", element: <AllPackages /> },
      { path: "/about-us", element: <AboutUs /> },

      {
        path: "/package/:id",
        element: (
          <PrivateRoute>
            <PackageDetails />
          </PrivateRoute>
        ),
        
        loader: ({ params }) =>
          fetch(`https://the-vagabond-tour.onrender.com/packages/${params.id}`).then((res) =>
            res.json()
          ),
      },

      {
        path: "/my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },

      {
        path: "/add-package",
        element: (
          <PrivateRoute>
            <GuideRoute>
              <AddPackage />
            </GuideRoute>
          </PrivateRoute>
        ),
      },

      {
        path: "/manage-my-packages",
        element: (
          <PrivateRoute>
            <GuideRoute>
              <ManageMyPackages />
            </GuideRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);
