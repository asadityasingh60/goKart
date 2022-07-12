import React,{Fragment,useEffect} from "react";
import Carousel from 'react-material-ui-carousel';
import {useSelector, useDispatch} from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import MetaData from "../layout/MetaData";
import "./ProductDetails.css";
import { useParams } from 'react-router-dom';


const ProductDetails = () => {

    const {id} = useParams();         // Id is retrieved by this method
    const dispatch = useDispatch();
  
    const { product, loading, error } = useSelector((state) => state.productDetails);

    useEffect(() => {
        dispatch(getProductDetails(id));
      }, [dispatch, id]);

    return(
        <Fragment>
            <MetaData title={`${product.name}--goKart`} />
            <div className="ProductDetails">
                <div>
                <Carousel>
                    {product.images &&
                    product.images.map((item, i) => (
                        <img
                        className="CarouselImage"
                        key={i}
                        src={item.url}
                        alt={`${i} Slide`}
                        />
                    ))}
                </Carousel>
                </div>    
            </div>
        </Fragment>
    );
};

export default ProductDetails;