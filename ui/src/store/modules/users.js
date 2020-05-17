// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import _ from 'lodash';
import http from '../../services/http';

const baseURL = '/users';

const slice = createSlice({
    name: 'users',
    initialState: {
        items: [],
        pagination: null,
    },
    reducers: {
        SET_USERS: (users, action) => {
            const { data, ...rest } = action.payload;

            return {
                ...users,
                items: data,
                pagination: rest,
            };
        },
    },
});

export const selectUsers = createSelector(
    (state) => state.users.items,
    (items) => items
);

const { SET_USERS } = slice.actions;

export const getUsers = (query_string = '') => async (dispatch) => {
    const url = query_string ? `${baseURL}?${query_string}` : baseURL;

    try {
        const { data } = await http.get(url);

        dispatch(SET_USERS(data));

        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const saveUser = (payload) => async (dispatch) => {
    const { id } = payload;
    const url = id ? `${baseURL}/${id}` : baseURL;
    const method = id ? 'PUT' : 'POST';
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const fields = ['username', 'password', 'is_admin'];
    try {
        const { data } = await http.wrapper({
            url,
            method,
            data: _.pick(payload, fields),
            ...options,
        });

        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getUser = (id) => async (dispatch) => {
    try {
        const { data } = await http.get(`${baseURL}/${id}`);

        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const deleteUser = (id) => async (dispatch) => {
    try {
        await http.delete(`${baseURL}/${id}`);

        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
};

export default slice.reducer;
