import React from "react";
import {Link} from "react-router-dom";
import { Rating } from 'react-simple-star-rating';


export default function ProductCard({product}){
    const options = {
        fillColor: "tomato",
        initialValue: product.ratings,
        allowHalfIcon: true,
        size: window.innerWidth < 600 ? 20 : 25
    }
    return(
        <Link className="productCard" to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt={product.name}/>
            <p>{product.name}</p>

            <div>
                <Rating {...options}/>
                <span>({product.numOfReviews})</span>
            </div>
            <span>{`₹${product.price}`}</span>
        </Link>
    );
};