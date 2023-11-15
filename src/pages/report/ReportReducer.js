import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../ApiCall";
import {getFileWithUrl, getToken, stopLoading, toastError} from "../more/Functions";
const slice = createSlice({
    name: "report",
    initialState: {
        result: {},
        error: {},
        oneDay: {},
        menuOneDay: [],
        reports: [],
        inputOutput: {},
        kidsNumber: "",
        reportMonth: {},
        menuOneDayReport: {},
        menuOneDayReport2: '',
    },
    reducers: {
        kidsNumber: (state, action) => {
            // let path = action.payload;
            // window.open(`${path}`, '_blank');
            getFileWithUrl(action.payload,"Hisobot");
            // state.kidsNumber = action.payload;
        },
        getReportMonth: (state, action) => {
            state.reportMonth = action.payload;
        },
        getAllByDate: (state, action) => {
            // state.kidsNumber = action.payload;
            var win = window.open(action.payload, '_blank');
            win.focus();
        },
        menuOneDay: (state, action) => {
            state.menuOneDay = action.payload;
        },
        menuOneDayReport: (state, action) => {
            if (action.payload) {
                // var win = window.open(action.payload, '_blank');
                // win.focus();
                state.menuOneDayReport = action.payload;
                getFileWithUrl(action.payload,"Taomnoma-kunlik");
            } else {
                toast.error("Bu kunga bola soni kiritilmagan!")
            }

        },
        menuOneDayReport2: (state, action) => {
            state.menuOneDayReport2 = action.payload;
        },
        inputOutput: (state, action) => {
            var win = window.open(action.payload, '_blank');
            win.focus();
        },
        reports: (state, action) => {
            state.reports = action.payload;
        },
        oneDay: (state, action) => {
            state.oneDay = action.payload;
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

export const getMenuReport = (params) => apiCall({
    url: "/report/getMenuReport",
    method: "GET",
    headers: {
        Authorization: getToken(),
        // "Content-Type": "application/pdf"
    },
    // responseType:"blob",
    params,
    success: slice.actions.menuOneDayReport.type,
    error: slice.actions.errorReducer.type
})
export const getRepoAllMonth = (params) => apiCall({
    url: "/report/getMenuReportAllMonth",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.kidsNumber.type,
    error: slice.actions.errorReducer.type
})

export const getReportMonth = (params) => apiCall({
    url: "/report/getReportMonth",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.getReportMonth.type,
    error: slice.actions.errorReducer.type
})


export const addReportMonth = (data) => apiCall({
    url: "/report/getReportMonth",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const oneDayFromAll = (params) => apiCall({
    url: "/report/getReportByDate",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.oneDay.type,
    error: slice.actions.errorReducer.type
})

export const deleteReport = (data) => apiCall({
    url: "/report/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const addReport = (data) => apiCall({
    url: "/report",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editReport = (data) => apiCall({
    url: "/report/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export default slice.reducer;
