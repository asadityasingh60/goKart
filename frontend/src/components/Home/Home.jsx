import React, { Fragment, useEffect } from "react";
import { BsArrow90DegDown } from 'react-icons/bs';
import "./Home.css";
import ProductCard from "./ProductCard.jsx";
import MetaData from "../layout/MetaData.jsx";
import {getProduct,clearErrors} from "../../actions/productAction";
import {useSelector, useDispatch} from "react-redux";
import Loader from "../layout/Loader/Loader";
import {useAlert} from "react-alert";



export default function Home(){

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading ,error, products} = useSelector(state=>state.products);

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
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
                        Scroll<BsArrow90DegDown/>
                    </button>
                </a>

            </div>

            <h2 className="homeHeading">Featured Products</h2>

            <div className="container" id="container">
                {products && products.map((product,i) =>(
                    <ProductCard
                        key={i}
                        product={product}
                        />
                ))}                                   
            </div>                     
            </Fragment>}
        </Fragment>
    );
}