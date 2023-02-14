import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getReturn = createAsyncThunk('return/getReturn', async () => {
	const response = await axios.get('http://localhost:5000/api/return');
	const data = await response.data;
	
	return data;
});

const returnAdapter = createEntityAdapter({});

export const { selectAll: selectReturn, selectById: selectReturnById } = returnAdapter.getSelectors(
	state => state.app.return
);

const returnSlice = createSlice({
	name: 'return',
	initialState: returnAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setReturnSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getReturn.fulfilled]: returnAdapter.setAll
	}
});

export const { setReturnSearchText } = returnSlice.actions;

export default returnSlice.reducer;
