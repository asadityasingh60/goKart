import React from "react";
import profilePng from "../../images/Profile.png";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

export default function ReviewCard({review}){

    return(
        <div className="reviewCard">
            <img src={profilePng} alt="User"/>
            <p>{review.name}</p>
            <Rating
                name="hover-feedback"
                value={review.rating}
                readOnly
                precision={0.5}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <span className="reviewCardComment">{review.comment}</span>
        </div>
    );
}