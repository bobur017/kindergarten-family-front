import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../../ApiCall";
import {getToken, toastError} from "../../more/Functions";

const slice = createSlice({
    name: "received",
    initialState: {
        result: {},
        error: {},
        receiveds: [],
    },
    reducers: {
        receiveds: (state, action) => {
            state.receiveds = action.payload;
        },
        received: (state, action) => {
            state.received = action.payload;
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

export const getReceived = (params) => apiCall({
    url: "/received",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.receiveds.type,
    error: slice.actions.errorReducer.type
})

export const deleteReceived = (data) => apiCall({
    url: "/received/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const addReceived = (data) => apiCall({
    url: "/received",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editReceived = (data) => apiCall({
    url: "/received/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export default slice.reducer;