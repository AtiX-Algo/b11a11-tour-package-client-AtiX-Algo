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
        path: "/add-package", 
        element: <PrivateRoute><AddPackage /></PrivateRoute> 
      },
      { 
        path: "/manage-my-packages", 
        element: <PrivateRoute><ManageMyPackages /></PrivateRoute> 
      },
      { 
        path: "/my-bookings", 
        element: <PrivateRoute><MyBookings /></PrivateRoute> 
      },
      {
        path: "/package/:id",
        element: <PrivateRoute><PackageDetails /></PrivateRoute>,
        loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/packages/${params.id}`)
      },
    ]
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);