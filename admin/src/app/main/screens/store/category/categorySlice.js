import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { isNull } from 'lodash-es';

export const getCategory = createAsyncThunk('category/getCategory', async params => {
	const response = await axios.get(`http://localhost:5000/api/category/${params.categoryId}`);
	console.log(params.categoryId);
	const data = await response.data[0];
console.log(response.data)
	return data;
});

export const saveCategory = createAsyncThunk('category/saveCategory', async category => {
	let response;
	const { title, slug, parent, active, image, home_include, nav_include ,des} = category;
console.log(category)
	response = await axios.post('http://localhost:5000/api/procategory', category);

	const data = await response.data;

	return data;
});

const categorySlice = createSlice({
	name: 'category',
	initialState: null,
	reducers: {
		resetCategory: () => null,
		newCategory: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					_id: '',
					title: '',
					slug: '',
					parent: '',
					nav_include: false,
					active: true
				}
			})
		}
	},
	extraReducers: {
		[getCategory.fulfilled]: (state, action) => action.payload,
		[saveCategory.fulfilled]: (state, action) => action.payload
	}
});

export const { newCategory, resetCategory } = categorySlice.actions;

export default categorySlice.reducer;
