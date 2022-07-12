import React from "react";
import Helmet from "react-helmet";


export default function MetaData({title}){
    return(
        <Helmet>
            <title>{title}</title> 
        </Helmet>
    );
}

// This Tag is used to give title to a page