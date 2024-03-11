import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    title: "",
    backGroundimg: "",
    slug: "",
    description: "",
    content: "",
    loading: false,
    error: "",
    success: "",
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setBackGroundimg: (state, action) => {
      state.backGroundimg = action.payload;
    },
    setSlug: (state, action) => {
      state.slug = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
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
  },
});

export const {
  setTitle,
  setBackGroundimg,
  setSlug,
  setDescription,
  setContent,
  setLoading,
  setError,
  setSuccess,
} = postSlice.actions;

export default postSlice.reducer;
