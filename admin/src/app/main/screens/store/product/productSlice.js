import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getProduct = createAsyncThunk('product/getProduct', async params => {
	console.log(params);
	const response = await axios.get(`http://localhost:5000/api/detail/${params.productId}`);
	const data = await response.data.user[0];

	let image = data.image;
	let arr = [];
	arr.push(image);
	data.images = arr;
	data.INR=data.price.INR;
	data.discount_price_INR=data.discountprice.INR;
	data.SAR=data.price.SAR;
	data.discount_price_SAR=data.discountprice.SAR;
	data.AED=data.price.AED;
	data.discount_price_AED=data.discountprice.AED;
	data.stockind=data.stock.INR;
	data.stockksa=data.stock.SAR;
	data.stockuae=data.stock.AED;

	console.log(data);

	return data === undefined ? null : data;
});

export const saveProduct = createAsyncThunk('product/saveProduct', async product => {
	const data = '';
	console.log(product);
	const response = await axios.post('http://localhost:5000/api/product', product);
	data = await response.data;

	return data;
});

const productSlice = createSlice({
	name: 'product',
	initialState: null,
	reducers: {
		resetProduct: () => null,
		newProduct: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					// _id: '',
					name: '',
					slug: '',
					images: [],
					brand: '',
					specs: '',
					waranty: '',
					return: '',
					related: [],
					bought_together: [],
					categories: [],
					height: '',
					width: '',
					depth: '',
					weight: '',
					short_desc: '',
					description: '',
					price: 0,
					discount_price: 0,
					sku: '',
					modal: '',
					countInStock: 0,
					nav_include: false,
					active: true,
					attr_type: '',
					attrs: [],
					topDeals_include: false,
					featured_include: false,
					sale_include: false,
					newProduct_include: false
				}
			})
		}
	},
	extraReducers: {
		[getProduct.fulfilled]: (state, action) => action.payload,
		[saveProduct.fulfilled]: (state, action) => action.payload
	}
});

export const { newProduct, resetProduct } = productSlice.actions;

export default productSlice.reducer;
