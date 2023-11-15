import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../ApiCall";
import {getToken, toastError} from "../more/Functions";

const slice = createSlice({
    name: "kindergarten",
    initialState: {
        result: {},
        error: {},
        kindergartens: [],
        kindergarten: {},
    },
    reducers: {
        kindergartens: (state, action) => {
            state.kindergartens = action.payload;
        },
        kindergarten: (state, action) => {
            state.kindergarten = action.payload;
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

export const getKindergarten = () => apiCall({
    url: "/kindergarten",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.kindergartens.type,
    error: slice.actions.errorReducer.type
})

export const getKindergartenCurrent = () => apiCall({
    url: "/kindergarten/getOneByUser",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.kindergartens.type,
    error: slice.actions.errorReducer.type
})

export const deleteKindergarten = (data) => apiCall({
    url: "/kindergarten/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const addKindergarten = (data) => apiCall({
    url: "/kindergarten",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editKindergarten = (data) => apiCall({
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