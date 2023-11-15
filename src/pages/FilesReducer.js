import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../ApiCall";
import {getToken, toastError} from "./more/Functions";
import {type} from "@testing-library/user-event/dist/type";

const slice = createSlice({
    name: "file",
    initialState: {
        result: {},
        userReport: '',
        error: {},
        files: [],
        file: '',
        multiMenu: '',
    },
    reducers: {
        files: (state, action) => {
            state.files = action.payload;
        },
        userReport: (state, action) => {
            state.userReport = action.payload;
        },
        multiMenu: (state, action) => {
            state.multiMenu = action.payload;
        },
        file: (state, action) => {
            state.file = action.payload;
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

export const getFile = (id) => apiCall({
    url: "/menu/getFile/"+id,
    method: "GET",
    headers: {
        Authorization: getToken(),
        // "Content-Type":" application/pdf;",
    },
    responseType:"blob",
    success: slice.actions.file.type,
    error: slice.actions.errorReducer.type
})

export const getMultiMenuFile = (id) => apiCall({
    url: "/multiMenu/getFile/"+id,
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    responseType:"blob",
    success: slice.actions.multiMenu.type,
    error: slice.actions.errorReducer.type
})

export const getFilesReports = () => apiCall({
    url: "/file",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.files.type,
    error: slice.actions.errorReducer.type
})

export const deleteFile = (data) => apiCall({
    url: "/file/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const getUserReport = (params) => apiCall({
    url: "/report",
    method: "GET",
    headers: {
        Authorization: getToken(),
        // "Content-Disposition": "attachment;filename=file.pdf",
        "Content-Type": "application/octet-stream", // or Content-type: "application/vnd.ms-excel"
    },
    responseType:"blob",
    params,
    success: slice.actions.userReport.type,
    error: slice.actions.errorReducer.type
})

export const getUserReportCheck = (params) => apiCall({
    url: "/report/checkFile",
    method: "GET",
    headers: {
        Authorization: getToken(),

    },
    params,
    success: slice.actions.userReport.type,
    error: slice.actions.errorReducer.type
})

export const getUserReportById = (id) => apiCall({
    url: "/report/"+id,
    method: "GET",
    headers: {
        Authorization: getToken(),
        "Content-Type": "application/octet-stream",
    },
    responseType:"blob",
    success: slice.actions.userReport.type,
    error: slice.actions.errorReducer.type
})

export const editFile = (data) => apiCall({
    url: "/file/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export default slice.reducer;