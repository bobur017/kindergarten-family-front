import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../ApiCall";
import {getToken, toastError} from "../more/Functions";

const slice = createSlice({
    name: "area",
    initialState: {
        result: {},
        error: {},
        areas: [],
        areaPayments: [],
    },
    reducers: {
        areas: (state, action) => {
            state.areas = action.payload;
        },
        areaPayments: (state, action) => {
            state.areaPayments = action.payload;
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

export const getArea = (params) => apiCall({
    url: "/area",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.areas.type,
    error: slice.actions.errorReducer.type
})

export const getAreaPayments = (params) => apiCall({
    url: "/area/getPayments",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.areaPayments.type,
    error: slice.actions.errorReducer.type
})

export const deleteArea = (data) => apiCall({
    url: "/area/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const addArea = (data,params) => apiCall({
    url: "/area",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    params,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const chiqim = (params) => apiCall({
    url: "/area/chiqim",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export default slice.reducer;
