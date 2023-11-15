import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../../ApiCall";
import {getToken, toastError} from "../../more/Functions";

const slice = createSlice({
    name: "children",
    initialState: {
        result: {},
        error: {},
        childrens: [],
    },
    reducers: {
        childrens: (state, action) => {
            state.childrens = action.payload;
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

export const getChildren = () => apiCall({
    url: "/children",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.childrens.type,
    error: slice.actions.errorReducer.type
})

export const deleteChildren = (data) => apiCall({
    url: "/children/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const addChildren = (data) => apiCall({
    url: "/children",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editChildren = (data) => apiCall({
    url: "/children/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export default slice.reducer;