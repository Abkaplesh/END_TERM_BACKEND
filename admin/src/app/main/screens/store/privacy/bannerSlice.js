import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPrivacy = createAsyncThunk('privacy/getPrivacy', async params => {
	const response = await axios.get(`http://localhost:5000/api/privacy`);
	const data = await response.data.user;

	return data === undefined ? null : data;
});

export const savePrivacy = createAsyncThunk('privacy/savePrivacy', async privacy => {
	let response;
	const { title, link, desc, short_desc, image, index, active } = privacy;

	response = await axios.post('http://localhost:5000/api/privacy', privacy);

	const data = await response.data.user;

	return data;
});

const privacySlice = createSlice({
	name: 'privacy',
	initialState: null,
	reducers: {
		resetPrivacy: () => null,
		newPrivacy: {
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
		[getPrivacy.fulfilled]: (state, action) => action.payload,
		[savePrivacy.fulfilled]: (state, action) => action.payload
	}
});

export const { newPrivacy, resetPrivacy } = privacySlice.actions;

export default privacySlice.reducer;
