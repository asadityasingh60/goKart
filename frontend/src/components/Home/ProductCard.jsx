import React from "react";
import {Link} from "react-router-dom";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';


export default function ProductCard({product}){

    return(
        <Link className="productCard" to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt={product.name}/>
            <p>{product.name}</p>

            <div>
            <Rating 
                value={product.ratings}
                readOnly
                precision={0.5}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
                <span>({product.numOfReviews})</span>
            </div>
            <span>{`₹${product.price}`}</span>
        </Link>
    );
};