import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'
import currentPageReducer from './slices/currentPageSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        currentPage: currentPageReducer,

    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
