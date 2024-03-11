// postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const uploadPost = createAsyncThunk(
  'posts/uploadPost',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await fetch('https://englishforum.zeabur.app/api/v1/posts/user/1?categoryId=1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit blog post');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    title: '',
    backGroundimg: '',
    slug: '',
    description: '',
    content: '',
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
  extraReducers: (builder) => {
    builder
      .addCase(uploadPost.pending, (state) => {
        state.loading = true;
        state.error = '';
        state.success = '';
      })
      .addCase(uploadPost.fulfilled, (state, action) => {
        state.loading = false;
        state.success = 'Submitted successfully';
        state.title = ''; // Reset title after successful submission
        state.backGroundimg = ''; // Reset background image after successful submission
        state.slug = ''; // Reset slug after successful submission
        state.description = '';
        state.content = '';
      })
      .addCase(uploadPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to submit blog post';
      });
  },
});

export const { setTitle, setBackGroundimg, setDescription, setContent, setLoading, setError, setSuccess } = postsSlice.actions;

export default postsSlice.reducer;
