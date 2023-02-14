import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getprivacy = createAsyncThunk('privacy/getprivacy', async () => {
	const response = await axios.get('http://localhost:5000/api/privacy');
	const data = await response.data;
	
	return data;
});

const privacyAdapter = createEntityAdapter({});

export const { selectAll: selectprivacy, selectById: selectprivacyById } = privacyAdapter.getSelectors(
	state => state.app.privacy
);

const privacySlice = createSlice({
	name: 'privacy',
	initialState: privacyAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setprivacySearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getprivacy.fulfilled]: privacyAdapter.setAll
	}
});

export const { setprivacySearchText } = privacySlice.actions;

export default privacySlice.reducer;
