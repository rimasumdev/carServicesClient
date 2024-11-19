import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Blog from "../Pages/Blog/Blog";
import Services from "../Pages/Services/Services";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import CheckOut from "../Pages/Checkout/Checkout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/checkout/:serviceId",
        element: <CheckOut />,
        errorElement: <ErrorPage />,
        // loader: async ({ params }) => {
        //   const response = await fetch(
        //     `http://localhost:3000/services/${params.serviceId}`
        //   );
        //   return response.json();
        // },
        loader: ({ params }) =>
          fetch(`http://localhost:3000/services/${params.serviceId}`),
      },
    ],
  },
]);

export default router;
