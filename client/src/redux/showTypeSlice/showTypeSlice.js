import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    showCourse: false,
};

const showTypeSlice = createSlice({
    name: 'showType',
    initialState,
    reducers: {
        changeShowType: (state) => {
            state.showCourse = !state.showCourse;
        },
        }
});

export const {changeShowType} = showTypeSlice.actions;

export default showTypeSlice.reducer;