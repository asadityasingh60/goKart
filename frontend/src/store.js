import {legacy_createStore as createStore, combineReducers,applyMiddleware} from "redux";
import {productDetailsReducer, productsReducer} from "./reducers/productReducer.jsx"
import {forgotPassawordReducer, profileReducer, userReducer} from "./reducers/userReducer.jsx"
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

const reducer = combineReducers({
    products:productsReducer,
    productDetails: productDetailsReducer,
    user : userReducer,
    profile : profileReducer,
    forgotPassword : forgotPassawordReducer,
});

let initialState={};
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
