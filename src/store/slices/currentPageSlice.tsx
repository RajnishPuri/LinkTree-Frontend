import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrentPageState {
    currentPage: string;
}

const initialState: CurrentPageState = {
    currentPage: 'home',
};

const currentPageSlice = createSlice({
    name: 'currentPage',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<string>) => {
            state.currentPage = action.payload;
        },
    },
});

export const { setCurrentPage } = currentPageSlice.actions;
export default currentPageSlice.reducer;