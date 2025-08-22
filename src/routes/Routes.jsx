
import { Root } from "../layout/Root";


import { ContuctUsPage } from "../Pages/ContactUsPage/ContuctUsPage";
import { HomePage } from "../Pages/HomePage/HomePage";
import { createBrowserRouter } from "react-router-dom";

import { SubmitTicketPage } from "../Pages/SubmitTicketPage.jsx/SubmitTicketPage";
import { BlogPage } from "../Pages/BlogPage/BlogPage";
import { Login } from "../Auth/Login";
import { ForgotPassword } from "../Auth/ForgotPassword";
import { Verification } from "../Auth/Verification";
import { NewPassword } from "../Auth/NewPassword";
import { SignUp } from "../Auth/SignUp";
import { ProfilePage } from "../Pages/ProfilePage/ProfilePage";
import { OngoingTicketPage } from "../Pages/ProfilePage/OngoingTicketPage";
import IndividualProduct from "../Pages/individualProduct/IndividualProduct";
import Order from "../Pages/order/Order";
import About from "../Pages/about/About";
import AllProduct from "../Pages/allProduct/AllProduct";
import ProductDetails from "../Pages/allProduct/ProductDetails";
import DesignPage from "../Pages/allProduct/DesignPage";
import Cart from "../Pages/cart/Cart";
import SaveDesign from "../Pages/allProduct/SaveDesign";
import SaveDetails from "../Pages/allProduct/SaveDetails";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: '/',
                element: <HomePage></HomePage>,
            },
             {
                path: '/individual_product',
                element: <IndividualProduct></IndividualProduct>
            },
              {
                path: '/order_page',
                element: <Order></Order>
            },
              {
                path: '/about',
                element: <About></About>
            },
      {
                path: '/allProduct',
                element: <AllProduct></AllProduct>
            },
               {
                path: '/allProduct/productDetails',
                element: <ProductDetails></ProductDetails>
            },

             {
                path: '/allProduct/productDetails/design',
                element: <DesignPage></DesignPage>
            },
            {
                path: '/allProduct/productDetails/design/saveDesign',
                element:<SaveDesign></SaveDesign>
            },
              {
                path: '/allProduct/productDetails/design/saveDesign/details',
                element:<SaveDetails></SaveDetails>
            },
      
           {
                path: '/cart',
                element: <Cart></Cart>
            },
      
        
        
      
            {
                path: '/contactUs',
                element: <ContuctUsPage></ContuctUsPage>
            },
            {
                path: '/blog',
                element: <BlogPage></BlogPage>
            },
            {
                path: '/submit-a-ticket',
                element: <SubmitTicketPage></SubmitTicketPage>
            },

            {
                path: '/profilePage',
                element: <ProfilePage></ProfilePage>
            },
            {
                path: '/profilePage/ongoing-tickets',
                element: <OngoingTicketPage></OngoingTicketPage>
            },
        ]
    },
    {
        path: '/auth/login',
        element: <Login></Login>
    },
    {
        path: '/auth/signUp',
        element: <SignUp></SignUp>
    },
    {
        path: '/auth/forgot-password',
        element: <ForgotPassword></ForgotPassword>
    },

    {
        path: '/auth/verification',
        element: <Verification></Verification>
    },
    {
        path: '/auth/update-password',
        element: <NewPassword></NewPassword>
    }
]);