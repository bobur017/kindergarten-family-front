import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../ApiCall";
import {getToken, toastError} from "../more/Functions";

const slice = createSlice({
    name: "sanpinCategory",
    initialState: {
        result: {},
        error: {},
        sanpinCategory: [],
    },
    reducers: {
        sanpinCategoryReducer: (state, action) => {
            state.sanpinCategory = action.payload;
        },
        resultReducer: (state, action) => {
            state.result = action.payload;
            toast.success(action.payload?.text);
        },
        errorReducer: (state, action) => {
            state.error = action.payload;
            toastError(action.payload);
            console.log(action.payload?.message,"reducerError")
        },
    }
})

export const getSanpinCategory = () => apiCall({
    url: "/sanpinCategory",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.sanpinCategoryReducer.type,
    error: slice.actions.errorReducer.type
})

export const deleteSanpinCategory = (data) => apiCall({
    url: "/sanpinCategory/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const addSanpinCategory = (data) => apiCall({
    url: "/sanpinCategory",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editSanpinCategory = (data) => apiCall({
    url: "/sanpinCategory/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export default slice.reducer;