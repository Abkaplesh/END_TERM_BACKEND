import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getCoupon = createAsyncThunk('coupon/getCoupon', async params => {
	const response = await axios.get(`http://localhost:5000/api/coupon/${params.couponId}`);
	const data = await response.data.user;

	return data === undefined ? null : data;
});

export const saveCoupon = createAsyncThunk('coupon/saveCoupon', async coupon => {
	let response;

	response = await axios.post('http://localhost:5000/api/coupon', coupon);

	const data = await response.data.user;

	return data;
});

const couponSlice = createSlice({
	name: 'coupon',
	initialState: null,
	reducers: {
		resetCoupon: () => null,
		newCoupon: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					title: '',
					desc: '',
					total: 0,
					coupon_type: 'AMOUNT',
					weightage: 0,
					active: true
				}
			})
		}
	},
	extraReducers: {
		[getCoupon.fulfilled]: (state, action) => action.payload,
		[saveCoupon.fulfilled]: (state, action) => action.payload
	}
});

export const { newCoupon, resetCoupon } = couponSlice.actions;

export default couponSlice.reducer;
