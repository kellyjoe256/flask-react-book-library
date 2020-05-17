// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import _ from 'lodash';
import http from '../../services/http';

const baseURL = '/books';

const slice = createSlice({
    name: 'books',
    initialState: {
        items: [],
        pagination: null,
    },
    reducers: {
        SET_BOOKS: (books, action) => {
            const { data, ...rest } = action.payload;

            return {
                ...books,
                items: data,
                pagination: rest,
            };
        },
    },
});

export const selectBooks = createSelector(
    (state) => state.books.items,
    (items) => items
);

const { SET_BOOKS } = slice.actions;

export const getBooks = (query_string = '') => async (dispatch) => {
    const url = query_string ? `${baseURL}?${query_string}` : baseURL;

    try {
        const { data } = await http.get(url);

        dispatch(SET_BOOKS(data));

        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const saveBook = (payload) => async (dispatch) => {
    const { id } = payload;
    const url = id ? `${baseURL}/${id}` : baseURL;
    const method = id ? 'PUT' : 'POST';
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // prettier-ignore
    const fields = [
        'title', 'isbn', 'num_of_pages',
        'publisher', 'publication_date',
        'authors', 'categories', 'about'
    ];
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

export const getBook = (id) => async (dispatch) => {
    try {
        const { data } = await http.get(`${baseURL}/${id}`);

        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const deleteBook = (id) => async (dispatch) => {
    try {
        await http.delete(`${baseURL}/${id}`);

        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
};

export default slice.reducer;
