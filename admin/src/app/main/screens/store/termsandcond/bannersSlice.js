import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const gettermsandcond = createAsyncThunk('termsandcond/gettermsandcond', async () => {
	const response = await axios.get('http://localhost:5000/api/termcond');
	const data = await response.data;
	
	return data;
});

const termsandcondAdapter = createEntityAdapter({});

export const { selectAll: selecttermsandcond, selectById: selecttermsandcondById } = termsandcondAdapter.getSelectors(
	state => state.app.termsandcond
);

const termsandcondSlice = createSlice({
	name: 'termsandcond',
	initialState: termsandcondAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		settermsandcondSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[gettermsandcond.fulfilled]: termsandcondAdapter.setAll
	}
});

export const { settermsandcondSearchText } = termsandcondSlice.actions;

export default termsandcondSlice.reducer;
