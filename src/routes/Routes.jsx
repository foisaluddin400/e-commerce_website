
import { Root } from "../layout/Root";


import { ContuctUsPage } from "../Pages/ContactUsPage/ContuctUsPage";
import { HomePage } from "../Pages/HomePage/HomePage";
import { createBrowserRouter } from "react-router-dom";

import { SubmitTicketPage } from "../Pages/SubmitTicketPage.jsx/SubmitTicketPage";
import  BlogPage  from "../Pages/BlogPage/BlogPage";
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
import GetPrice from "../Pages/allProduct/GetPrice";
import ChooseOrder from "../Pages/allProduct/ChooseOrder";
import OrderSummery from "../Pages/allProduct/OrderSummery";
import PaymentOrder from "../Pages/allProduct/PaymentOrder";
import IndividualDetails from "../Pages/allProduct/IndividualDetails";
import Faq from "../Pages/setting/Faq";
import PrivecyAndPolicy from "../Pages/setting/PrivecyAndPolicy";
import TermsAndCondition from "../Pages/setting/TermsAndCondition";
import Testing from "../Pages/allProduct/Testing";



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
                path: '/individual_product/details',
                element:<IndividualDetails></IndividualDetails>
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
                path: '/test',
                element: <Testing></Testing>
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
                path: '/allProduct/productDetails/design/getPrice',
                element:<GetPrice></GetPrice>
            },
              {
                path: '/allProduct/productDetails/design/getPrice/chooseOrder',
                element:<ChooseOrder></ChooseOrder>
            },
            {
                path: '/allProduct/productDetails/design/getPrice/chooseOrder/orderSummery',
                element:<OrderSummery></OrderSummery>
            },
             {
                path: '/allProduct/productDetails/design/getPrice/chooseOrder/orderSummery/paymentOrder',
                element:<PaymentOrder></PaymentOrder>
            },
      
           {
                path: '/cart',
                element: <Cart></Cart>
            },
      

            {
                path: '/faq',
                element: <Faq></Faq>
            },

              {
                path: '/privecyPolicy',
                element: <PrivecyAndPolicy></PrivecyAndPolicy>
            },

              {
                path: '/termsAndCondition',
                element: <TermsAndCondition></TermsAndCondition>
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