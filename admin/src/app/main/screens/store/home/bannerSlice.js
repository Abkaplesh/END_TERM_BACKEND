import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getHome = createAsyncThunk('home/gethome', async params => {
	const response = await axios.get(`http://localhost:5000/api/home`);
	const data = await response.data.user;

	return data === undefined ? null : data;
});

export const saveHome = createAsyncThunk('home/savehome', async home => {
	let response;
	const { title, link, desc, short_desc, image, index, active } = home;

	response = await axios.post('http://localhost:5000/api/home', home);

	const data = await response.data.user;

	return data;
});

const homeSlice = createSlice({
	name: 'home',
	initialState: null,
	reducers: {
		resetHome: () => null,
		newHome: {
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
		[getHome.fulfilled]: (state, action) => action.payload,
		[saveHome.fulfilled]: (state, action) => action.payload
	}
});

export const { newHome, resetHome } = homeSlice.actions;

export default homeSlice.reducer;
