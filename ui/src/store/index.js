import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducer';

const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware()],
});

export default store;
