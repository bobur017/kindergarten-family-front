import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../../ApiCall";
import {getToken, toastError} from "../../more/Functions";

const slice = createSlice({
    name: "user",
    initialState: {
        result: {},
        error: {},
        users: [],
        user: {},
    },
    reducers: {
        users: (state, action) => {
            state.users = action.payload;
        },
        user: (state, action) => {
            state.user = action.payload;
        },
        resultReducer: (state, action) => {
            state.result = action.payload;
            toast.success(action.payload?.text);
        },
        errorReducer: (state, action) => {
            state.error = action.payload;
            toastError(action.payload)
        },
    }
})

export const getUsers = () => apiCall({
    url: "/user",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.users.type,
    error: slice.actions.errorReducer.type
})

export const getUserCurrent = () => apiCall({
    url: "/user/current",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.user.type,
    error: slice.actions.errorReducer.type
})

export const deleteUser = (data) => apiCall({
    url: "/user/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const addUser = (data) => apiCall({
    url: "/user",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const addManager = (data) => apiCall({
    url: "/user/addManager",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editUser = (data) => apiCall({
    url: "/user/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export default slice.reducer;
