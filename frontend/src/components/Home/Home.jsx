import React, { Fragment, useEffect } from "react";
import { BsMouse } from 'react-icons/bs';
import "./Home.css";
import Product from "./Product.jsx";
import MetaData from "../layout/MetaData.jsx";
import {getProduct} from "../../actions/productAction";
import {useSelector, useDispatch} from "react-redux";
import Loader from "../layout/Loader/Loader";
import {useAlert} from "react-alert";



export default function Home(){

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading ,error, products, productsCount} = useSelector(state=>state.products);

    useEffect(()=>{
        if(error){
            return alert.error(error);
        }
        dispatch(getProduct());
    },[dispatch,error,alert]);

    return(
        <Fragment>
            {loading? <Loader/>:
            <Fragment>
            <MetaData title="goKart"/>
            <div className="banner">
                <p>Welcome to goKart</p>
                <h1>Find Amazing Products Below</h1>

                <a href="#container">
                    <button>
                        Scroll<BsMouse/>
                    </button>
                </a>

            </div>

            <h2 className="homeHeading">Featured Products</h2>

            <div className="container" id="container">
                {products && products.map((product,i) =>(
                    <Product 
                        key={i}
                        product={product}
                        />
                ))}                                   
            </div>                     
            </Fragment>}
        </Fragment>
    );
}