import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../ApiCall";
import {getToken, toastError} from "../more/Functions";

const slice = createSlice({
    name: "mtt",
    initialState: {
        result: {},
        error: {},
        mtts: [],
    },
    reducers: {
        setMtt: (state, action) => {
            state.mtts = action.payload;
        },
        resultReducer: (state, action) => {
            state.result = action.payload;
            toast.success(action.payload?.text);
        },
        errorReducer: (state, action) => {
            state.error = action.payload;
            toastError(action.payload);
        },
    }
})

export const getMtt = () => apiCall({
    url: "/kindergarten",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.setMtt.type,
    error: slice.actions.errorReducer.type
})

export const getByDepartmentMtt = (id) => apiCall({
    url: "/kindergarten/getByDepartmentId/"+id,
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.setMtt.type,
    error: slice.actions.errorReducer.type
})

export const deleteMtt = (data) => apiCall({
    url: "/kindergarten/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const addMtt = (data) => apiCall({
    url: "/kindergarten",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editMtt = (data) => apiCall({
    url: "/kindergarten/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export default slice.reducer;