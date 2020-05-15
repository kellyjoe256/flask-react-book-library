// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import http from '../../services/http';

const baseURL = '/auth';

const slice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
    },
    reducers: {
        SET_USER: (auth, action) => ({
            user: action.payload,
        }),
    },
});

export const selectUser = createSelector(
    (state) => state.auth.user,
    (user) => user
);

const { SET_USER } = slice.actions;

export const login = (credentials) => async (dispatch) => {
    const url = `${baseURL}/login`;
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const { data: user } = await http.post(url, credentials, options);
        dispatch(SET_USER(user));

        return Promise.resolve(user);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const authenticate = () => async (dispatch, getState) => {
    const { auth } = getState();
    if (auth.user) {
        return;
    }

    const url = `${baseURL}/me`;
    try {
        const { data: user } = await http.get(url);
        dispatch(SET_USER(user));

        return Promise.resolve(user);
    } catch (error) {
        dispatch(SET_USER(null));
        console.log(error);

        return Promise.reject(error);
    }
};

export const logout = () => async (dispatch) => {
    const url = `${baseURL}/logout`;

    try {
        await http.post(url);
        dispatch(SET_USER(null));

        return Promise.resolve();
    } catch (error) {
        dispatch(SET_USER(null));

        return Promise.reject(error);
    }
};

export default slice.reducer;
