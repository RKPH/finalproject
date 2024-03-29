import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const storedAuth = localStorage.getItem('auth');
const initialState = storedAuth ? JSON.parse(storedAuth) : {
  isAuthenticated: false,
  token: null,
  refreshToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, refreshToken } = action.payload;
      state.isAuthenticated = true;
      state.token = token;
      state.refreshToken = refreshToken;
      localStorage.setItem('auth', JSON.stringify(state));
    },
    registerSuccess: (state, action) => {
      const { token, refreshToken } = action.payload;
      state.isAuthenticated = true;
      state.token = token;
      state.refreshToken = refreshToken;
      localStorage.setItem('auth', JSON.stringify(state));
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.refreshToken = null;
      localStorage.removeItem('auth');
    },
    updateUsernameSuccess: (state, action) => {
      const { username } = action.payload;
      // Update only the username field while keeping other fields intact
      state.isAuthenticated = true; // Assuming authentication state remains unchanged
      state.username = username;
      localStorage.setItem('auth', JSON.stringify(state));
    },
    
  },
});

export const { loginSuccess, logoutSuccess, registerSuccess, updateUsernameSuccess } = authSlice.actions;

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await fetch('https://englishforum.zeabur.app/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.token && data.refreshToken) {
      dispatch(loginSuccess({
        token: data.token,
        refreshToken: data.refreshToken
      }));
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};

export const registerUser = (username, email, password) => async (dispatch) => {
  try {
    const response = await axios.post('https://englishforum.zeabur.app/api/v1/auth/register', {
      username,
      email,
      password,
      avatar: 'http://res.cloudinary.com/dqemenkwp/image/upload/v1711275758/a6442ee2-705b-4c9d-8f70-1907da3630a4.png',
      role: {
        id: 0,
        name: 'user'
      },
      ban: false
    });

    const data = response.data;

    if (data.token && data.refreshToken) {
      dispatch(registerSuccess({
        token: data.token,
        refreshToken: data.refreshToken
      }));
    } else {
      throw new Error('Registration failed');
    }
  } catch (error) {
    console.error("Registration failed:", error);
  }
};

export const updateUsername = (userId, newUsername, token) => async (dispatch) => {
  try {
    const response = await axios.put(
      `https://englishforum.zeabur.app/api/v1/users/${userId}`,
      { username: newUsername,
        password: "1234"
       },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;

    if (data.username) {
      dispatch(updateUsernameSuccess({ username: data.username }));
    } else {
      throw new Error('Update username failed');
    }
  } catch (error) {
    console.error("Update username failed:", error);
  }
};


export default authSlice.reducer;
