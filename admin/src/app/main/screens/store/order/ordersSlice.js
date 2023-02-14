import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getOrders = createAsyncThunk('orders/getOrders', async () => {
	const response = await axios.get('http://localhost:5000/api/adminorder');
	const data = await response.data.user;

	return data;
});

export const removeOrders = createAsyncThunk('orders/removeOrders', async (orderIds, { dispatch, getState }) => {
	await axios.post('/api/remove-orders', { orderIds });

	return orderIds;
});

const ordersAdapter = createEntityAdapter({});

export const { selectAll: selectOrders, selectById: selectOrderById } = ordersAdapter.getSelectors(
	state => state.app.orders
);

const ordersSlice = createSlice({
	name: 'orders',
	initialState: ordersAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setOrdersSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getOrders.fulfilled]: ordersAdapter.setAll,
		[removeOrders.fulfilled]: (state, action) => ordersAdapter.removeMany(state, action.payload)
	}
});

export const { setOrdersSearchText } = ordersSlice.actions;

export default ordersSlice.reducer;
