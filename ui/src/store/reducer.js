import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './modules/auth';
import baseReducer from './modules/base';
import categoriesReducer from './modules/categories';

export default combineReducers({
    auth: authReducer,
    base: baseReducer,
    categories: categoriesReducer,
});
