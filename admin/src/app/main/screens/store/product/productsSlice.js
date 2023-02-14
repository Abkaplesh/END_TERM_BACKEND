import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk('products/getProducts', async () => {
	const response = await axios.get('http://localhost:5000/api/product');
	const data = await response.data.user;
	return data;
});

export const removeProducts = createAsyncThunk(
	'eCommerceApp/products/removeProducts',
	async (productIds, { dispatch, getState }) => {
		for (let i = 0; i < productIds.length; i++) {
			await axios.post('http://localhost:5000/api/productdelete', { id: productIds[i] });
		}

		return productIds;
	}
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductById } = productsAdapter.getSelectors(
	state => state.app.products
);

const productsSlice = createSlice({
	name: 'products',
	initialState: productsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setProductsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getProducts.fulfilled]: productsAdapter.setAll,
		[removeProducts.fulfilled]: (state, action) => productsAdapter.removeMany(state, action.payload)
	}
});

export const { setProductsSearchText } = productsSlice.actions;

export default productsSlice.reducer;
