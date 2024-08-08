import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import NotFoundPage from "./not-found";
import DiscoverPage from "./routes/discover";
import HomePage from "./routes/home";
import "./index.css";
import CartShopping from "./routes/cart";
import LoginPage from "./routes/login";
import RegisterPage from "./routes/register";
import ResetPasswordPage from "./routes/resetPassword";
import ProductPage from "./routes/product";
import { fetchData, findProduct } from "./libs/utils";
import AboutPage from "./routes/about-us";
import ContactPage from "./routes/contact";

const router = createBrowserRouter([
  {
    element: <Root/>,
    errorElement: <NotFoundPage/>,
    loader: async ()=> {
      return fetchData()
    },
    children: [
      {
        path: "/",
        element: <HomePage/>,
      },
      {
        path: "/discover",
        element: <DiscoverPage/>
      },
      {
        path: "/products/:id",
        element: <ProductPage/>,
        loader: async ({params})=> {
          return findProduct(params.id)
        }
      },
      {
        path: "/cart",
        element: <CartShopping/>,
      },
      {
        path: "/about-us",
        element: <AboutPage/>,
      },
      {
        path: "/contact",
        element: <ContactPage/>,
      },
      {
        path: "/profile",
        element: <LoginPage/>,
      },
      {
        path: "/register",
        element: <RegisterPage/>,
      },
      {
        path: "/resetPassword",
        element: <ResetPasswordPage/>,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
