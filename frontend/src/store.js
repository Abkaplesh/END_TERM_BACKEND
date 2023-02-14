import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logindisplay, resetPassword, userLoginReducer, userRegisterReducer } from './reducer/userreducer';
import { details, priceListReducer, productListReducer } from './reducer/productreducer';
import { addCartListReducer, getcoupon, getTax } from './reducer/cartreducer';
import { subtotal } from './reducer/subtotalreducer';
import {
	addOrderListReducer,
	allOrderListReducer,
	getreview,
	order,
	postaddress,
	shippingAddressReducre
} from './reducer/orderreducer';
import { getbanner } from './reducer/bannerreducer';
import { addWishlistReducer } from './reducer/wishlistreducer';
import { passchange } from './actions/useraction';

const reducer = combineReducers({
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	productList: productListReducer,
	priceList: priceListReducer,
	addCart: addCartListReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	subtotal: subtotal,
	detail: details,
	shipping: shippingAddressReducre,
	order: order,
	orderlist: addOrderListReducer,
	resetpass: resetPassword,
	allorders: allOrderListReducer,
	banner: getbanner,
	wishlist: addWishlistReducer,
	passchange: passchange,
	review: getreview,
	postaddress: postaddress,
	getcoupon: getcoupon,
	gettax:getTax,
	getdisplay:logindisplay,
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
	userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
