import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../../ApiCall";
import {getToken, toastError} from "../../more/Functions";

const slice = createSlice({
    name: "childrenNumber",
    initialState: {
        result: {},
        error: {},
        childrenNumbers: [],
        dailyChildrenNumbers: [],
        childrenNumber: {},
    },
    reducers: {
        childrenNumbers: (state, action) => {
            state.childrenNumbers = action.payload;
        },
        dailyChildrenNumbers: (state, action) => {
            state.dailyChildrenNumbers = action.payload;
        },
        childrenNumber: (state, action) => {
            state.childrenNumber = action.payload;
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

export const getDailyInformation = (params) => apiCall({
    url: "/dailyInformation",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.dailyChildrenNumbers.type,
    error: slice.actions.errorReducer.type
})

export const addDailyInformation = (params,data) => apiCall({
    url: "/dailyInformation",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    params,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const getChildrenNumbers = (params) => apiCall({
    url: "/kidsNumber/byCalendar",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.childrenNumbers.type,
    error: slice.actions.errorReducer.type
})

export const getChildrenNumbersByDate = (params) => apiCall({
    url: "/kidsNumber/getOne",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.childrenNumber.type,
    error: slice.actions.errorReducer.type
})

export const getChildrenNumberCurrent = () => apiCall({
    url: "/childrenNumber/current",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.childrenNumber.type,
    error: slice.actions.errorReducer.type
})

export const deleteChildrenNumber = (data) => apiCall({
    url: "/childrenNumber/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const addChildrenNumber = (data) => apiCall({
    url: "/kidsNumber",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editChildrenNumber = (data) => apiCall({
    url: "/childrenNumber/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})
export default slice.reducer;
