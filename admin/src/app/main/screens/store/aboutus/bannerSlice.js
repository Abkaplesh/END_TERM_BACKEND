import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAboutus = createAsyncThunk('aboutus/getAboutus', async params => {
	const response = await axios.get(`http://localhost:5000/api/aboutus`);
	const data = await response.data.user;

	return data === undefined ? null : data;
});

export const saveAboutus = createAsyncThunk('aboutus/saveAboutus', async aboutus => {
	let response;
	const { title, link, desc, short_desc, image, index, active } = aboutus;

	response = await axios.post('http://localhost:5000/api/aboutus', aboutus);

	const data = await response.data.user;

	return data;
});

const aboutusSlice = createSlice({
	name: 'aboutus',
	initialState: null,
	reducers: {
		resetAboutus: () => null,
		newAboutus: {
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
		[getAboutus.fulfilled]: (state, action) => action.payload,
		[saveAboutus.fulfilled]: (state, action) => action.payload
	}
});

export const { newAboutus, resetAboutus } = aboutusSlice.actions;

export default aboutusSlice.reducer;
