import { createSlice } from "@reduxjs/toolkit";
import { apiCall } from "./ApiCall";
const slice = createSlice({
    name: "reducer",
    initialState: {
        result: {},
        resultAnalis: {},
        user: [],
        token: {},
        error: {},
        image: []
    },
    reducers: {
        resultReducer: (state, action) => {
            state.result = action.payload;
        },
        imageReducer: (state, action) => {
            state.result = action.payload;
        },
        errorReducer: (state, action) => {
            state.error = action.payload;
        },
    }
})

function getToken() {
    return localStorage.getItem("Authorization");
}

export const get = () => apiCall({
    url: "/get",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.departments.type,
    error: slice.actions.errorReducer.type
})


export default slice.reducer;