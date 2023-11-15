import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {getToken, toastError} from "../../more/Functions";
import {apiCall} from "../../../ApiCall";

const slice = createSlice({
    name:"balance",
    initialState:{
        balances:[],
        history:[],
        result:{},
        error:{},
    },
    reducers:{
        history: (state, action) => {
            state.history = action.payload;
        },
        balances: (state, action) => {
            state.balances = action.payload;
        },
        balance: (state, action) => {
            state.balance = action.payload;
        },
        resultReducer: (state, action) => {
            state.result = action.payload;
            toast.success(action.payload?.text);
            toast.success(action.payload);
        },
        errorReducer: (state, action) => {
            state.error = action.payload;
            toastError(action.payload)
        },
    }
})


export const getBalances = (params) => apiCall({
    url: "/balance",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.balances.type,
    error: slice.actions.errorReducer.type
})

export const getBalancesHistory = () => apiCall({
    url: "/balance/paymentHistory",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.history.type,
    error: slice.actions.errorReducer.type
})


export const addBalance = (params) => apiCall({
    url: "/balance/addPayment",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    params,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export default slice.reducer;
