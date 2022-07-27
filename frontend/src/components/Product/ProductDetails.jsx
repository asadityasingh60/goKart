import React,{Fragment,useEffect,useState} from "react";
import Carousel from 'react-material-ui-carousel';
import {useSelector, useDispatch} from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import MetaData from "../layout/MetaData";
import "./ProductDetails.css";
import { useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import ReviewCard from "./ReviewCard.jsx";
import Loader from "../layout/Loader/Loader.jsx";
import {useAlert} from "react-alert";
import {addItemsToCart} from "../../actions/cartAction.jsx";



const ProductDetails = () => {

    const {id} = useParams();         // Id is retrieved by this method
    const dispatch = useDispatch();
    const alert = useAlert();

    const [quantity,setQuantity] = useState(1);
  
    const { product, loading, error } = useSelector((state) => state.productDetails);

    function increaseQuantity(){
        if(quantity>=product.Stock){
            return;
        }else{
            setQuantity(quantity+1);
        }
    }
    function decreaseQuantity(){
        if(quantity<=1){
            return;
        }else{
            setQuantity(quantity-1);
        }
    }

    function addToCartHandler(){
        dispatch(addItemsToCart(id,quantity));
        alert.success("Items Added To Cart");
    }
    
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(id));
      }, [dispatch, id, error, alert]);

    const options = {
        fillColor: "tomato",
        initialValue: product.ratings,
        allowHalfIcon: true,
        size: window.innerWidth < 600 ? 20 : 25
    }

    return(
        <Fragment>
            {loading ? <Loader/> : 
                <Fragment>
                <MetaData title={`${product.name}--goKart`} />
                <div className="ProductDetails">
                    <div>
                        <Carousel>
                            {product.images &&
                            product.images.map((item, i) => (
                                <img
                                width="500" 
                                height="300"
                                className="img"
                                key={i}
                                src={item.url}
                                alt={`${i} Slide`}
                                />
                            ))}
                        </Carousel>
                    </div>    

                    <div>
                        <div className="detailsBlock-1">
                            <h2>{product.name}</h2>
                            <p>Product # {product._id}</p>
                        </div>
                        <div className="detailsBlock-2">
                            <Rating {...options}/>
                            <span>({product.numOfReviews})</span>
                        </div>
                        <div className="detailsBlock-3">
                            <h1>{`₹${product.price}`}</h1>
                            <div className="detailsBlock-3-1">
                                <div className="detailsBlock-3-1-1">
                                    <button onClick={decreaseQuantity}>-</button>
                                    <input readOnly type="number" value={quantity} />
                                    <button onClick={increaseQuantity}>+</button>
                                </div>
                                <button
                                    disabled={product.Stock < 1 ? true : false}
                                    onClick={addToCartHandler}
                                >
                                    Add to Cart
                                </button>
                            </div>
                            <p>
                                Status:
                                <b className={product.Stock<1 ? "redColor" : "greenColor"}>
                                    {product.Stock < 1 ? "OutOfStock":"InStock"}
                                </b>
                            </p>
                        </div>
                        <div className="detailsBlock-4">
                            Description : <p>{product.description}</p>
                        </div>
                        <button className="submitReview"> Submit Review</button>
                    </div>
                </div>
                <h3 className="reviewsHeading">REVIEWS</h3>
                {product.reviews && product.reviews[0] ? (
                <div className="reviews">
                {product.reviews &&
                    product.reviews.map((review) => (
                    <ReviewCard 
                        key={review._id} 
                        review={review} 
                    />
                    ))}
                </div>
                ) : (
                    <p className="noReviews">No Reviews Yet</p>
                )}
            </Fragment>
            }
        </Fragment>
    );
};

export default ProductDetails;