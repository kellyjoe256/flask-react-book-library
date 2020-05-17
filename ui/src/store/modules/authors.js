// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import _ from 'lodash';
import http from '../../services/http';

const baseURL = '/authors';

const slice = createSlice({
    name: 'authors',
    initialState: {
        items: [],
        pagination: null,
    },
    reducers: {
        SET_AUTHORS: (authors, action) => {
            const { data, ...rest } = action.payload;

            return {
                ...authors,
                items: data,
                pagination: rest,
            };
        },
    },
});

export const selectAuthors = createSelector(
    (state) => state.authors.items,
    (items) => items
);

const { SET_AUTHORS } = slice.actions;

export const getAuthors = (query_string = '') => async (dispatch) => {
    const url = query_string ? `${baseURL}?${query_string}` : baseURL;

    try {
        const { data } = await http.get(url);

        if (!url.includes('all')) {
            dispatch(SET_AUTHORS(data));
        }

        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const saveAuthor = (payload) => async (dispatch) => {
    const { id } = payload;
    const url = id ? `${baseURL}/${id}` : baseURL;
    const method = id ? 'PUT' : 'POST';
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const fields = ['first_name', 'last_name', 'gender', 'about'];
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

export const getAuthor = (id) => async (dispatch) => {
    try {
        const { data } = await http.get(`${baseURL}/${id}`);

        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const deleteAuthor = (id) => async (dispatch) => {
    try {
        await http.delete(`${baseURL}/${id}`);

        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
};

export default slice.reducer;
