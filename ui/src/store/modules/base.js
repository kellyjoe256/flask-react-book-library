import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const slice = createSlice({
    name: 'base',
    initialState: {
        logging_out: false,
    },
    reducers: {
        SET_LOGGING_OUT: (base, action) => ({
            logging_out: action.payload,
        }),
    },
});

export const loggingOut = createSelector(
    (state) => state.base.logging_out,
    (logging_out) => logging_out
);

export const { SET_LOGGING_OUT } = slice.actions;

export default slice.reducer;
