import {legacy_createStore as createStore, combineReducers,applyMiddleware} from "redux";
import {newReviewReducer, productDetailsReducer, productsReducer} from "./reducers/productReducer.jsx"
import {forgotPassawordReducer, profileReducer, userReducer} from "./reducers/userReducer.jsx"
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { cartReducer } from "./reducers/cartReducer.jsx";
import { myOrdersReducer, newOrderReducer, orderDetailsReducer } from "./reducers/orderReducer.jsx";

const reducer = combineReducers({
    products:productsReducer,
    productDetails: productDetailsReducer,
    newReview : newReviewReducer,

    user : userReducer,
    profile : profileReducer,
    forgotPassword : forgotPassawordReducer,

    cart: cartReducer,

    newOrder : newOrderReducer,
    myOrders : myOrdersReducer,
    orderDetails : orderDetailsReducer,
});

let initialState={
    cart: {
        cartItems: localStorage.getItem("cartItems") 
        ? JSON.parse(localStorage.getItem("cartItems")) 
        : [],
        shippingInfo: localStorage.getItem("shippingInfo") 
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : [],
    }
};
//This Initial data never gets deleted from your google account untill clear browsing history, so it remains even if u switch account or reload

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
