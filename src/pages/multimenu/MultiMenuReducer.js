import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../ApiCall";
import {getFileWithUrl, getToken, toastError} from "../more/Functions";

const slice = createSlice({
    name: "multiMenu",
    initialState: {
        result: {},
        error: {},
        multiMenuList: [],
        multiMenu: {},
        menu: {},
        multiMenuProduct: [],
        getFile: [],
    },
    reducers: {
        multiMenuList: (state, action) => {
            state.multiMenuList = action.payload;
        },
        multiMenu: (state, action) => {
            state.multiMenu = action.payload;
        },
        getFile: (state, action) => {
            getFileWithUrl(action.payload,"Taomnoma");
        },
        menu: (state, action) => {
            state.menu = action.payload;
        },
        multiMenuProduct: (state, action) => {
            state.multiMenuProduct = action.payload;
        },
        multiMenuProductFile: (state, action) => {
            // state.multiMenuFile = action.payload;
            getFileWithUrl(action.payload,"Mahsulotlar");
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

export const getMultiMenu = () => apiCall({
    url: "/multiMenu",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.multiMenuList.type,
    error: slice.actions.errorReducer.type
})
export const getMultiMenuGetFile = (id) => apiCall({
    url: "/multiMenu/getFile/"+id,
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.getFile.type,
    error: slice.actions.errorReducer.type
})
export const getMultiMenuProductFile = (id) => apiCall({
    url: "/multiMenu/getProductFile/" + id,
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.multiMenuProductFile.type,
    error: slice.actions.errorReducer.type
})
export const getMultiMenuProduct = (id) => apiCall({
    url: "/multiMenu/getProduct/" + id,
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.multiMenuProduct.type,
    error: slice.actions.errorReducer.type
})
export const selectMultiMenu = (data) => apiCall({
    url: "/menu/select/"+data?.id,
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const getMenuOne = (id) => apiCall({
    url: "/menu/" + id,
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.menu.type,
    error: slice.actions.errorReducer.type
})

export const getMenuOneByrReport = (id) => apiCall({
    url: "/menu/report/" + id,
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.menu.type,
    error: slice.actions.errorReducer.type
})

export const getMultiMenuOne = (id) => apiCall({
    url: "/multiMenu/"+id,
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.multiMenu.type,
    error: slice.actions.errorReducer.type
})

export const deleteMultiMenu = (data) => apiCall({
    url: "/multiMenu/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const deleteMultiMenuOne = (data) => apiCall({
    url: "/multiMenu/deleteMeal/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const addMultiMenu = (data) => apiCall({
    url: "/multiMenu",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})
export const addMultiMenuMeal = (data) => apiCall({
    url: "/multiMenu/addMeal/"+data.id,
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type,
})

export const editMultiMenu = (params,data) => apiCall({
    url: "/multiMenu/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export default slice.reducer;
