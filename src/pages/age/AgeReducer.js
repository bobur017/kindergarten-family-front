import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../ApiCall";
import {getToken, toastError} from "../more/Functions";

const slice = createSlice({
    name: "age",
    initialState: {
        result: {},
        error: {},
        ages: [],
    },
    reducers: {
        ages: (state, action) => {
            state.ages = action.payload;
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

export const getAge = () => apiCall({
    url: "/ageGroup",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.ages.type,
    error: slice.actions.errorReducer.type
})

export const deleteAge = (data) => apiCall({
    url: "/ageGroup/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const addAge = (data) => apiCall({
    url: "/ageGroup",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editAge = (data) => apiCall({
    url: "/ageGroup/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export default slice.reducer;