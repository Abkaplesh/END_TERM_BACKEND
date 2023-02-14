import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const gettermsandcond = createAsyncThunk('termsandcond/gettermsandcond', async params => {
	const response = await axios.get(`http://localhost:5000/api/termcond`);
	const data = await response.data.user;

	return data === undefined ? null : data;
});

export const savetermsandcond = createAsyncThunk('termsandcond/savetermsandcond', async termsandcond => {
	let response;
	const { title, link, desc, short_desc, image, index, active } = termsandcond;

	response = await axios.post('http://localhost:5000/api/termcond', termsandcond);

	const data = await response.data.user;

	return data;
});

const termsandcondSlice = createSlice({
	name: 'termsandcond',
	initialState: null,
	reducers: {
		resettermsandcond: () => null,
		newtermsandcond: {
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
		[gettermsandcond.fulfilled]: (state, action) => action.payload,
		[savetermsandcond.fulfilled]: (state, action) => action.payload
	}
});

export const { newtermsandcond, resettermsandcond } = termsandcondSlice.actions;

export default termsandcondSlice.reducer;
