import {
	ADD_ITEM_TO_CART,
	ADD_ITEM_TO_CART_FAIL,
	ADD_ITEM_TO_CART_SUCCESS,
	CART_LIST_FAIL,
	CART_LIST_REQUEST,
	CART_LIST_SUCCESS,
	DECREMENT,
	GET_COUPON_FAIL,
	GET_COUPON_REQUEST,
	GET_COUPON_SUCCESS,
	GET_TAX_FAIL,
	GET_TAX_REQUEST,
	GET_TAX_SUCCESS,
	INCREMENT,
	REMOVE_ITEM_FROM_CART,
	REMOVE_ITEM_FROM_CART_FAIL,
	REMOVE_ITEM_FROM_CART_SUCCESS,
	SUBTOTAL
} from '../constant/cartconstant';

export const addCartListReducer = (state = { cart: [], sub: 0 }, action) => {
	switch (action.type) {
		case ADD_ITEM_TO_CART:
			return { cart: [] };
		case ADD_ITEM_TO_CART_SUCCESS:
			return {
				cart: []
			};

		case ADD_ITEM_TO_CART_FAIL:
			return { error: action.payload };

		case REMOVE_ITEM_FROM_CART:
			return { cart: state.cart };

		case REMOVE_ITEM_FROM_CART_SUCCESS:
			return { cart: state.cart.filter(item => item._id !== action.payload) };

		case REMOVE_ITEM_FROM_CART_FAIL:
			return { error: action.payload };

		case CART_LIST_REQUEST:
			return {
				cart: []
			};

		case CART_LIST_SUCCESS:
			return { cart: action.payload };

		case CART_LIST_FAIL:
			return { cart: [] };

		default:
			return state;
	}
};

export const getcoupon = (state = { coupon: null }, action) => {
	switch (action.type) {
		case GET_COUPON_REQUEST:
			return { coupon: null };
		case GET_COUPON_SUCCESS:
			return { coupon: action.payload };
		case GET_COUPON_FAIL:
			return { coupon: null };
		default:
			return state;
	}
};



export const getTax = (state = { tax: {INR:0,AED:0,SAR:0} }, action) => {
	switch (action.type) {
		case GET_TAX_REQUEST:
			return { tax: {INR:0,AED:0,SAR:0} };
		case GET_TAX_SUCCESS:
			return { tax: action.payload };
		case GET_TAX_FAIL:
			return { tax: {INR:0,AED:0,SAR:0} };
		default:
			return state;
	}
};
