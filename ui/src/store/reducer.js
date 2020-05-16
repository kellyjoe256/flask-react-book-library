import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './modules/auth';
import baseReducer from './modules/base';
import authorsReducer from './modules/authors';
import categoriesReducer from './modules/categories';

export default combineReducers({
    auth: authReducer,
    base: baseReducer,
    authors: authorsReducer,
    categories: categoriesReducer,
});
