import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    title: '',
    backGroundimg: '',
 
    loading: false,
    error: '',
    success: '',
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setBackGroundimg: (state, action) => {
      state.backGroundimg = action.payload;
    },
   
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    resetState: (state) => {
      state.title = '';
      state.backGroundimg = '';
      state.content = '';
      state.loading = false;
      state.error = '';
      state.success = '';
    },
  },
});

export const { setTitle, setBackGroundimg, setLoading, setError, setSuccess, resetState } = postSlice.actions;

export const selectPost = (state) => state.post;

export default postSlice.reducer;
