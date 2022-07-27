import {legacy_createStore as createStore, combineReducers,applyMiddleware} from "redux";
import {productDetailsReducer, productsReducer} from "./reducers/productReducer.jsx"
import {forgotPassawordReducer, profileReducer, userReducer} from "./reducers/userReducer.jsx"
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { cartReducer } from "./reducers/cartReducer.jsx";

const reducer = combineReducers({
    products:productsReducer,
    productDetails: productDetailsReducer,

    user : userReducer,
    profile : profileReducer,
    forgotPassword : forgotPassawordReducer,

    cart: cartReducer,
});

let initialState={
    cart: {
        cartItems: localStorage.getItem("cartItems") 
        ? JSON.parse(localStorage.getItem("cartItems")) 
        : [],
        // shippingInfo: localStorage.getItem("shippingInfo") 
        // ? JSON.parse(localStorage.getItem("shippingInfo"))
        // : [],
    }
};
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
