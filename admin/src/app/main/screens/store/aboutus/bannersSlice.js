import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAboutus = createAsyncThunk('aboutus/getAboutus', async () => {
	const response = await axios.get('http://localhost:5000/api/aboutus');
	const data = await response.data;
	
	return data;
});

const aboutusAdapter = createEntityAdapter({});

export const { selectAll: selectAboutus, selectById: selectAboutusById } = aboutusAdapter.getSelectors(
	state => state.app.aboutus
);

const aboutusSlice = createSlice({
	name: 'aboutus',
	initialState: aboutusAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setAboutusSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getAboutus.fulfilled]: aboutusAdapter.setAll
	}
});

export const { setAboutusSearchText } = aboutusSlice.actions;

export default aboutusSlice.reducer;
