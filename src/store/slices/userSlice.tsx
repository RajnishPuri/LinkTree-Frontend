import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    bio: string;
    backgroundImage: string;
    createdAt: string;
    social: [
        {
            handleName: string;
            description: string;
            link: string;
            _id: string
        }
    ];
    updatedAt: string;
    user: {
        Profile: string;
        createdAt: string;
        email: string;
        name: string;
        profilePhoto: string;
        updatedAt: string;
        userName: string;
        __v: number;
        _id: string;
    };
    userName: string;
    __v: number;
    _id: string;
}

interface UserState {
    user: User | null;
}

const initialState: UserState = {
    user: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
