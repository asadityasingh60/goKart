import "./App.css"
import React, { useEffect } from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import WebFont from "webfontloader";

import Header from "./components/layout/Header/Header.jsx";
import Footer from "./components/layout/Footer/Footer.jsx";
import Home from "./components/Home/Home.jsx";
import ProductDetails from "./components/Product/ProductDetails.jsx";
import Products from "./components/Product/Products.jsx";
import Search from "./components/Product/Search.jsx";



export default function App() {

  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    });
  },[]);

  return (
    <Router>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/product/:id" element={<ProductDetails/>} />
        <Route exact path="/products" element={<Products/>} />
        <Route path ="/products/:keyword" element={<Products/>}/>

        <Route exact path="/search" element={<Search/>} />
      </Routes>
      <Footer/>
      
    </Router>
  );
}

