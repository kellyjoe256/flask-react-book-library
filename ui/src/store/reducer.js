import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './modules/auth';
import baseReducer from './modules/base';

export default combineReducers({
    auth: authReducer,
    base: baseReducer,
});
