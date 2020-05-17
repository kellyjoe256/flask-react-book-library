import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './modules/auth';
import booksReducer from './modules/books';
import usersReducer from './modules/users';
import authorsReducer from './modules/authors';
import categoriesReducer from './modules/categories';

export default combineReducers({
    auth: authReducer,
    books: booksReducer,
    users: usersReducer,
    authors: authorsReducer,
    categories: categoriesReducer,
});
