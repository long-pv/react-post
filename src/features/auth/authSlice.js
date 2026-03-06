import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginRequest, registerRequest, logoutRequest } from './authApi';
import { ACCESS_TOKEN_KEY, USER_KEY } from '../../constants/storageKeys';

const storedToken = localStorage.getItem(ACCESS_TOKEN_KEY);
const storedUser = localStorage.getItem(USER_KEY);

const initialState = {
    token: storedToken || null,
    user: storedUser ? JSON.parse(storedUser) : null,
    status: 'idle',
    error: null,
};

const normalizeAuthData = (responseData) => {
    const token =
        responseData?.token ||
        responseData?.accessToken ||
        responseData?.data?.token ||
        responseData?.data?.accessToken ||
        null;

    const userFromResponse = responseData?.user || responseData?.data?.user;

    const user =
        userFromResponse ||
        (responseData?.id || responseData?.username
            ? {
                  id: responseData.id,
                  username: responseData.username,
                  email: responseData.email,
                  name: responseData.name || responseData.firstName,
              }
            : null);

    return { token, user };
};

export const login = createAsyncThunk('auth/login', async (payload, thunkAPI) => {
    try {
        const responseData = await loginRequest(payload);
        return normalizeAuthData(responseData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Đăng nhập thất bại');
    }
});

export const register = createAsyncThunk('auth/register', async (payload, thunkAPI) => {
    try {
        const responseData = await registerRequest(payload);
        return normalizeAuthData(responseData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Đăng ký thất bại');
    }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await logoutRequest();
        return true;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Đăng xuất thất bại');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearAuthError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.token;
                state.user = action.payload.user;
                if (action.payload.token) {
                    localStorage.setItem(ACCESS_TOKEN_KEY, action.payload.token);
                }
                if (action.payload.user) {
                    localStorage.setItem(USER_KEY, JSON.stringify(action.payload.user));
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload.token) {
                    state.token = action.payload.token;
                    localStorage.setItem(ACCESS_TOKEN_KEY, action.payload.token);
                }
                if (action.payload.user) {
                    state.user = action.payload.user;
                    localStorage.setItem(USER_KEY, JSON.stringify(action.payload.user));
                }
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(logout.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.status = 'idle';
                state.token = null;
                state.user = null;
                localStorage.removeItem(ACCESS_TOKEN_KEY);
                localStorage.removeItem(USER_KEY);
            })
            .addCase(logout.rejected, (state) => {
                state.status = 'idle';
                state.token = null;
                state.user = null;
                localStorage.removeItem(ACCESS_TOKEN_KEY);
                localStorage.removeItem(USER_KEY);
            });
    },
});

export const { clearAuthError } = authSlice.actions;

export default authSlice.reducer;
