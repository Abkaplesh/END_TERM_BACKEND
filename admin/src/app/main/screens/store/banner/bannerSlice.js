import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBanner = createAsyncThunk('banner/getBanner', async params => {
	const response = await axios.get(`http://localhost:5000/api/banner`);
	const data = await response.data.user;

	return data === undefined ? null : data;
});

export const saveBanner = createAsyncThunk('banner/saveBanner', async banner => {
	let response;
	const { title, link, desc, short_desc, image, index, active } = banner;

	response = await axios.post('http://localhost:5000/api/banner', {
		title,
		link,
		desc,
		short_desc,
		image,
		index,
		active
	});

	const data = await response.data.user;

	return data;
});

const bannerSlice = createSlice({
	name: 'banner',
	initialState: null,
	reducers: {
		resetBanner: () => null,
		newBanner: {
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
		[getBanner.fulfilled]: (state, action) => action.payload,
		[saveBanner.fulfilled]: (state, action) => action.payload
	}
});

export const { newBanner, resetBanner } = bannerSlice.actions;

export default bannerSlice.reducer;
