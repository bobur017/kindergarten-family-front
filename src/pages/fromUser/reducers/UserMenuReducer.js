import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../../ApiCall";
import {getToken, toastError} from "../../more/Functions";

const slice = createSlice({
    name: "userMenu",
    initialState: {
        result: {},
        error: {},
        userMenus: [],
        userMenu: {},
    },
    reducers: {
        userMenus: (state, action) => {
            state.userMenus = action.payload;
        },
        userMenu: (state, action) => {
            state.userMenu = action.payload;
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

export const getUserMenus = () => apiCall({
    url: "/multiMenu",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.userMenus.type,
    error: slice.actions.errorReducer.type
})

export const deleteUserMenu = (data) => apiCall({
    url: "/multiMenu/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const addUserMenu = (data) => apiCall({
    url: "/menu",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editUserMenu = (data) => apiCall({
    url: "/multiMenu/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export default slice.reducer;