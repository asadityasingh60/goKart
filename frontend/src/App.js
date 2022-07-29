import "./App.css"
import React, { useEffect ,useState} from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import WebFont from "webfontloader";
import {useSelector} from "react-redux";
import axios from "axios";
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

import Header from "./components/layout/Header/Header.jsx";
import Footer from "./components/layout/Footer/Footer.jsx";
import Home from "./components/Home/Home.jsx";
import ProductDetails from "./components/Product/ProductDetails.jsx";
import Products from "./components/Product/Products.jsx";
import Search from "./components/Product/Search.jsx";
import LoginSignUp from "./components/User/LoginSignUp";
import store from "./store.js"
import {loadUser} from "./actions/userAction";
import UserOptions from "./components/layout/Header/userOptions.jsx";
import Profile from "./components/User/Profile.jsx";
import UpdateProfile from "./components/User/UpdateProfile.jsx";
import UpdatePassword from "./components/User/UpdatePassword.jsx";
import ForgotPassword from "./components/User/ForgotPassword.jsx";
import ResetPassword from "./components/User/ResetPassword.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Shipping from "./components/Cart/Shipping.jsx";
import ConfirmOrder from "./components/Cart/ConfirmOrder.jsx";
import Payment from "./components/Cart/Payment.jsx";
import OrderSuccess from "./components/Cart/OrderSuccess.jsx";
import MyOrders from "./components/Order/MyOrders.jsx";
import OrderDetails from "./components/Order/OrderDetails.jsx";
import Dashboard from "./components/Admin/Dashboard.jsx";
import ProductList from "./components/Admin/ProductList.jsx";
import NewProduct from "./components/Admin/NewProduct.jsx";
import UpdateProduct from "./components/Admin/UpdateProduct.jsx";
import OrderList from "./components/Admin/OrderList.jsx";
import ProcessOrder from "./components/Admin/ProcessOrder.jsx";
import UsersList from "./components/Admin/UsersList.jsx";
import UpdateUser from "./components/Admin/UpdateUser.jsx";
import ProductReviews from "./components/Admin/ProductReviews.jsx";
import About from "./components/layout/Information/About.jsx";
import Contact from "./components/layout/Information/Contact.jsx";
import NotFound from "./components/layout/Not Found/NotFound.jsx";


export default function App() {
  const {user,isAuthenticated} = useSelector(state=>state.user);

  const [stripeApiKey,setStripeApiKey] = useState("");

  async function getStripeApiKey(){
    const {data} = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }
 

  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    });
    
    store.dispatch(loadUser());
    getStripeApiKey();
  },[]);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());
 
  return (
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user={user}/>}
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/product/:id" element={<ProductDetails/>} />
        <Route exact path="/products" element={<Products/>} />
        <Route path ="/products/:keyword" element={<Products/>}/>

        <Route exact path="/search" element={<Search/>} />
        <Route exact path="/login" element={<LoginSignUp/>} />
        {isAuthenticated && <Route exact path="/account" element={<Profile/>}/>}
        {isAuthenticated && <Route exact path="/me/update" element={<UpdateProfile/>}/>}
        {isAuthenticated && <Route exact path="/password/update" element={<UpdatePassword/>}/>}
        <Route exact path="/password/forgot" element={<ForgotPassword/>}/>
        <Route exact path="/password/reset/:token" element={<ResetPassword/>}/>
        <Route exact path="/cart" element={<Cart/>}/>
        {isAuthenticated && <Route exact path="/shipping" element={<Shipping/>}/>}
        <Route exact path="/order/confirm" element={<ConfirmOrder/>}/>
        {stripeApiKey && isAuthenticated && <Route exact path="/process/payment" element={<Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements>}/>}
        {isAuthenticated && <Route exact path="/success" element={<OrderSuccess/>}/>}
        {isAuthenticated && <Route exact path="/orders" element={<MyOrders/>}/>}
        {isAuthenticated && <Route exact path="/order/:id" element={<OrderDetails/>}/>}
        <Route exact path="/admin/dashboard" element={<Dashboard/>}/>
        <Route exact path="/admin/products" element={<ProductList/>}/>
        <Route exact path="/admin/product/new" element={<NewProduct/>}/>
        <Route exact path="/admin/product/:id" element={<UpdateProduct/>}/>
        <Route exact path="/admin/orders" element={<OrderList/>}/>
        <Route exact path="/admin/order/:id" element={<ProcessOrder/>}/>
        <Route exact path="/admin/users" element={<UsersList/>}/>
        <Route exact path="/admin/user/:id" element={<UpdateUser/>}/>
        <Route exact path="/admin/reviews" element={<ProductReviews/>}/>
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/contact" element={<Contact/>}/>
        <Route exact path="*" element={ window.location.pathname === "/process/payment" ? null : <NotFound/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

