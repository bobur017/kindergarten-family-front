import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../ApiCall";
import {getToken, toastError} from "../more/Functions";

const slice = createSlice({
    name: "product",
    initialState: {
        result: {},
        product: {},
        error: {},
        products: [],
        productsCategories: [],
        delete:{},
        measurement:[],
        productPrice:[],
    },
    reducers: {
        products: (state, action) => {
            state.products = action.payload;
        },
        productPrice: (state, action) => {
            state.productPrice = action.payload;
        },
        measurement: (state, action) => {
            state.measurement = action.payload;
        },
        productsCategory: (state, action) => {
            state.productsCategories = action.payload;
        },
        resultReducer: (state, action) => {
            state.result = action.payload;
            toast.success(action.payload?.text);
        },
        errorReducer: (state, action) => {
            state.error = action.payload;
            toast.error(action.payload?.response?.data?.text);
        },
        deleteErrorReducer: (state, action) => {
            state.delete = action.payload;
            toastError(action.payload);
        },
    }
})

export const getProductCategory = () => apiCall({
    url: "/productCategory",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.productsCategory.type,
    error: slice.actions.errorReducer.type
})

export const deleteProductCategory = (data) => apiCall({
    url: "/productCategory/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.deleteErrorReducer.type
})


export const addProductCategory = (data) => apiCall({
    url: "/productCategory",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const addProductPrice = (data) => apiCall({
    url: "/productPrice",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editProductPrice = (data) => apiCall({
    url: "/productPrice/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})
export const editProductCategory = (data) => apiCall({
    url: "/productCategory/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})
// start product functions
export const getProduct = () => apiCall({
    url: "/product",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.products.type,
    error: slice.actions.errorReducer.type
})// start product functions
export const getProductPrice = (params) => apiCall({
    url: "/productPrice",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.productPrice.type,
    error: slice.actions.errorReducer.type
})
export const autoProductPrice = (params) => apiCall({
    url: "/productPrice/autoPrice",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})
export const getMeasurement = () => apiCall({
    url: "/measurement",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.measurement.type,
    error: slice.actions.errorReducer.type
})

export const deleteProduct = (data) => apiCall({
    url: "/product/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export const addProduct = (data) => apiCall({
    url: "/product",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editProduct = (data) => apiCall({
    url: "/product/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})


export default slice.reducer;
