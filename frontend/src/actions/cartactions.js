import axios from 'axios';
import {
	ADD_ITEM_TO_CART,
	ADD_ITEM_TO_CART_FAIL,
	ADD_ITEM_TO_CART_SUCCESS,
	REMOVE_ITEM_FROM_CART_SUCCESS,
	REMOVE_ITEM_FROM_CART,
	REMOVE_ITEM_FROM_CART_FAIL,
	CART_LIST_SUCCESS,
	CART_LIST_REQUEST,
	CART_LIST_FAIL,
	INCREMENT,
	DECREMENT,
	SUBTOTAL,
	STORESUBTOTAL,
	GET_COUPON_REQUEST,
	GET_COUPON_SUCCESS,
	GET_COUPON_FAIL,
	SET_COUPON_REQUEST,
	SET_COUPON_SUCCESS,
	SET_COUPON_FAIL,
	GET_TAX_REQUEST,
	GET_TAX_SUCCESS,
	GET_TAX_FAIL
} from '../constant/cartconstant';
export const addproductcart =
	(title, image, description, price, weight, dimensions, count, productId, userId,discountprice,pricecon) => async dispatch => {
		try {
			dispatch({ type: ADD_ITEM_TO_CART });

			const { data } = await axios.post(`http://localhost:5000/api/cart`, {
				title,
				image,
				description,
				price,
				weight,
				dimensions,
				count,
				userId,
				productId,
				discountprice,pricecon
			});
			dispatch({
				type: ADD_ITEM_TO_CART_SUCCESS,
				payload: data
			});
		} catch (error) {
			dispatch({
				type: ADD_ITEM_TO_CART_FAIL,
				payload: []
			});
		}
	};
export const removeproductcart = id => async dispatch => {
	try {
		dispatch({ type: REMOVE_ITEM_FROM_CART });

		const { data } = await axios.post(`http://localhost:5000/api/cartdelete`, {
			id,
			userId: JSON.parse(localStorage.getItem('userInfo')).user
		});
		dispatch({
			type: REMOVE_ITEM_FROM_CART_SUCCESS,
			payload: id
		});
	} catch (error) {
		dispatch({
			type: REMOVE_ITEM_FROM_CART_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};
export const cartlist = userId => async dispatch => {
	try {
		dispatch({ type: CART_LIST_REQUEST });

		const { data } = await axios.get(`http://localhost:5000/api/cart/${userId}`);

		dispatch({
			type: CART_LIST_SUCCESS,
			payload: data.user[0].products
		});
	} catch (error) {
		dispatch({
			type: CART_LIST_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

export const subtotal = (subtotal, x) => dispatch => {
	dispatch({ type: SUBTOTAL, payload: { add: subtotal, min: x } });
};

export const subtotalget = () => dispatch => {
	dispatch({ type: STORESUBTOTAL, payload: 0 });
};

export const cartadd = (userId, id, count) => async dispatch => {
	try {
		dispatch({ type: INCREMENT });

		const { data } = await axios.put(`http://localhost:5000/api/cart`, {
			id,
			count,
			userId: JSON.parse(localStorage.getItem('userInfo')).user
		});
	} catch (error) {
		dispatch({
			type: INCREMENT,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};
export const cartdec = (id, count) => async dispatch => {
	try {
		dispatch({ type: DECREMENT });

		const { data } = await axios.put(`http://localhost:5000/api/cart`, {
			count,
			id,
			userId: JSON.parse(localStorage.getItem('userInfo')).user
		});
	} catch (error) {
		dispatch({
			type: DECREMENT,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

export const getcoupon = coupon => async dispatch => {
	try {
		dispatch({ type: GET_COUPON_REQUEST });
		console.log(coupon);

		const { data } = await axios.get(`http://localhost:5000/api/coupontitle/${coupon}`);

		dispatch({ type: GET_COUPON_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: GET_COUPON_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

export const setcoupon = coupon => async dispatch => {
	try {
		dispatch({ type: SET_COUPON_REQUEST });
		console.log(coupon);

		const { data } = await axios.post(`http://localhost:5000/api/updatecoupon`, coupon);

		dispatch({ type: SET_COUPON_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: SET_COUPON_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

export const gettax = () => async dispatch => {
	try {
		dispatch({ type: GET_TAX_REQUEST });

		const { data } = await axios.get(`http://localhost:5000/api/tax`);
		console.log(data[0])
		dispatch({
			type: GET_TAX_SUCCESS,
			payload: data[0]
		});
	} catch (error) {
		dispatch({
			type: GET_TAX_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};
