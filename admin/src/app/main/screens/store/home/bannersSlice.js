import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getHome = createAsyncThunk('home/gethome', async () => {
	const response = await axios.get('http://localhost:5000/api/home');
	const data = await response.data;
	
	return data;
});

const homeAdapter = createEntityAdapter({});

export const { selectAll: selecthome, selectById: selecthomeById } = homeAdapter.getSelectors(
	state => state.app.home
);

const homeSlice = createSlice({
	name: 'home',
	initialState: homeAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		sethomeSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getHome.fulfilled]: homeAdapter.setAll
	}
});

export const { setHomeSearchText } = homeSlice.actions;

export default homeSlice.reducer;
