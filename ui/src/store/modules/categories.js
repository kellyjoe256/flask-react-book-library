// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import _ from 'lodash';
import http from '../../services/http';

const baseURL = '/categories';

const slice = createSlice({
    name: 'categories',
    initialState: {
        items: [],
        pagination: null,
    },
    reducers: {
        SET_CATEGORIES: (categories, action) => {
            const { data, ...rest } = action.payload;

            return {
                ...categories,
                items: data,
                pagination: rest,
            };
        },
    },
});

export const selectCategories = createSelector(
    (state) => state.categories.items,
    (items) => items
);

const { SET_CATEGORIES } = slice.actions;

export const getCategories = (query_string = '') => async (dispatch) => {
    const url = query_string ? `${baseURL}?${query_string}` : baseURL;

    try {
        const { data } = await http.get(url);

        dispatch(SET_CATEGORIES(data));

        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const saveCategory = (payload) => async (dispatch) => {
    const { id } = payload;
    const url = id ? `${baseURL}/${id}` : baseURL;
    const method = id ? 'PUT' : 'POST';
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const { data } = await http.wrapper({
            url,
            method,
            data: _.pick(payload, ['name']),
            ...options,
        });

        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getCategory = (id) => async (dispatch) => {
    try {
        const { data } = await http.get(`${baseURL}/${id}`);

        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const deleteCategory = (id) => async (dispatch) => {
    try {
        await http.delete(`${baseURL}/${id}`);

        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
};

export default slice.reducer;
