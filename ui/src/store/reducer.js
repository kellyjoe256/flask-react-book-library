import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './modules/auth';
import baseReducer from './modules/base';
import booksReducer from './modules/books';
import authorsReducer from './modules/authors';
import categoriesReducer from './modules/categories';

export default combineReducers({
    auth: authReducer,
    base: baseReducer,
    books: booksReducer,
    authors: authorsReducer,
    categories: categoriesReducer,
});
