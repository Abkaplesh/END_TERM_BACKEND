import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getReturn = createAsyncThunk('return/getReturn', async params => {
	const response = await axios.get(`http://localhost:5000/api/return`);
	const data = await response.data.user;

	return data === undefined ? null : data;
});

export const saveReturn = createAsyncThunk('return/saveReturn', async returns => {
	let response;
	const { title, link, desc, short_desc, image, index, active } = returns;

	response = await axios.post('http://localhost:5000/api/return', returns);

	const data = await response.data.user;

	return data;
});

const returnSlice = createSlice({
	name: 'return',
	initialState: null,
	reducers: {
		resetReturn: () => null,
		newReturn: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					_id: '',
					title: '',
					link: '',
					desc: '',
					short_desc: '',
					image: '',
					index: '',
					active: true
				}
			})
		}
	},
	extraReducers: {
		[getReturn.fulfilled]: (state, action) => action.payload,
		[saveReturn.fulfilled]: (state, action) => action.payload
	}
});

export const { newReturn, resetReturn } = returnSlice.actions;

export default returnSlice.reducer;
