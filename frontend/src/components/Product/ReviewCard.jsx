import React from "react";
import profilePng from "../../images/Profile.png";
import { Rating } from 'react-simple-star-rating';

export default function ReviewCard({review}){
    const options = {
        fillColor: "tomato",
        initialValue: review.rating,
        allowHalfIcon: true,
        size: window.innerWidth < 600 ? 20 : 25
    }
    return(
        <div className="reviewCard">
            <img src={profilePng} alt="User"/>
            <p>{review.name}</p>
            <Rating {...options}/>
            <span>{review.comment}</span>
        </div>
    );
}