import "./App.css"
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import WebFont from "webfontloader";
import {useDispatch,useSelector} from "react-redux";

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



export default function App() {
  
  const dispatch = useDispatch();

  const {user,isAuthenticated} = useSelector(state=>state.user);
  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    });
    store.dispatch(loadUser());
  },[dispatch]);

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
      </Routes>
      <Footer/>
      
    </Router>
  );
}

