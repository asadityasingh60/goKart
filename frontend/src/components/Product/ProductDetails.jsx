import React,{Fragment,useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import { clearErrors, getProductDetails, newReview } from "../../actions/productAction";
import MetaData from "../layout/MetaData";
import "./ProductDetails.css";
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import ReviewCard from "./ReviewCard.jsx";
import Loader from "../layout/Loader/Loader.jsx";
import {useAlert} from "react-alert";
import {addItemsToCart} from "../../actions/cartAction.jsx";
import { Dialog,DialogActions,DialogContent,DialogTitle,Button } from "@mui/material";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";



const ProductDetails = () => {

    const {id} = useParams();         // Id is retrieved by this method
    const dispatch = useDispatch();
    const alert = useAlert();

    const [quantity,setQuantity] = useState(1);
    const [open,setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment,setComment] = useState("");

    const { product, loading, error } = useSelector((state) => state.productDetails);
    const {success, error: reviewError} = useSelector((state) => state.newReview);

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

    function reviewSubmitHandler(e){
        e.preventDefault();
  
        const myForm = new FormData();
    
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        dispatch(newReview(myForm));
        setOpen(false);
    }


    function submitReviewToggle(e){
        open ? setOpen(false) : setOpen(true);
    }

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(reviewError){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(success){
            alert.success("Review Submitted Successfully");
            dispatch({type:NEW_REVIEW_RESET});
        }
        dispatch(getProductDetails(id));
      }, [dispatch, id, error, alert,success,reviewError]);

      const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
      };

      return (
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <MetaData title={`${product.name} -- ECOMMERCE`} />
              <div className="ProductDetails">
                <div>
                    {product.images &&
                      product.images.map((item, i) => (
                        <img
                          className="CarouselImage"
                          key={i}
                          src={item.url}
                          alt={`${i} Slide`}
                        />
                      ))}
                </div>
    
                <div>
                  <div className="detailsBlock-1">
                    <h2>{product.name}</h2>
                    <p>Product # {product._id}</p>
                  </div>
                  <div className="detailsBlock-2">
                    <Rating 
                      {...options} 
                      emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit"/>} 
                    />
                    <span className="detailsBlock-2-span">
                      ({product.numOfReviews} Reviews)
                    </span>
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
                      <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
                      </b>
                    </p>
                  </div>
    
                  <div className="detailsBlock-4">
                    Description : <p>{product.description}</p>
                  </div>
    
                  <button onClick={submitReviewToggle} className="submitReview">
                    Submit Review
                  </button>
                </div>
              </div>
    
              <h3 className="reviewsHeading">REVIEWS</h3>
    
              <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={submitReviewToggle}
              >
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className="submitDialog">
                  <Rating
                    onChange={(e) => setRating(e.target.value)}
                    // value={rating}
                    precision = {0.5}
                    size="large"
                    emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit"/>}
                  />
    
                  <textarea
                    className="submitDialogTextArea"
                    cols="30"
                    rows="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </DialogContent>
                <DialogActions>
                  <Button onClick={submitReviewToggle} color="secondary">
                    Cancel
                  </Button>
                  <Button onClick={reviewSubmitHandler} color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
    
              {product.reviews && product.reviews[0] ? (
                <div className="reviews">
                  {product.reviews &&
                    product.reviews.map((review) => (
                      <ReviewCard key={review._id} review={review} />
                    ))}
                </div>
              ) : (
                <p className="noReviews">No Reviews Yet</p>
              )}
            </Fragment>
          )}
        </Fragment>
      );
};

export default ProductDetails;