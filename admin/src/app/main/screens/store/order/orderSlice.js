import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getOrder = createAsyncThunk('order/getOrder', async params => {
	const response = await axios.get(`http://localhost:5000/api/orders/${params.orderId}`);
	const data = await response.data.user[0];
	console.log(data);

	return data === undefined ? null : data;
});

export const saveOrder = createAsyncThunk('order/saveOrder', async order => {
	const response = await axios.post('/api/order/save', order);
	const data = await response.data;

	return data;
});

const orderSlice = createSlice({
	name: 'order',
	initialState: null,
	reducers: {
		resetOrder: () => null
	},
	extraReducers: {
		[getOrder.fulfilled]: (state, action) => action.payload,
		[saveOrder.fulfilled]: (state, action) => action.payload
	}
});

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
