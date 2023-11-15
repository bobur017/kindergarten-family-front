import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../../ApiCall";
import {getToken, toastError} from "../more/Functions";
import {toast} from "react-toastify";

const slice = createSlice({
    name: "login",
    initialState: {
        result: {},
        checkTelResult: {},
        checkTelError: {},
        checkCodeError: {},
        checkCodeResult: {},
        resetCodeResult: {},
        resetCodeError: {},
        token: {},
        error: {},
        loading: false,
    },
    reducers: {
        resultReducer: (state, action) => {
            state.result = action.payload;
        },
        loading: (state, action) => {
            state.loading = action.payload;
        },

        tokenReducer: (state, action) => {
            state.token = action.payload;
        },
        errorReducer: (state, action) => {
            state.error = action.payload;
            if (action.payload.response?.status === 403) {
                toast.error("Ma'lumotlar topilmadi!")
            } else {
                toastError(action.payload);
            }
        },
        checkTelResult: (state, action) => {
            state.checkTelResult = action.payload;
        },
        checkTelError: (state, action) => {
            state.checkTelError = action.payload;
            toastError(action.payload);
        },
        resetCodeResult: (state, action) => {
            state.resetCodeResult = action.payload;
        },
        resetCodeError: (state, action) => {
            state.resetCodeError = action.payload;
            toastError(action.payload);
        },
        checkCodeResult: (state, action) => {
            state.checkCodeResult = action.payload;
        },
        checkCodeError: (state, action) => {
            state.checkCodeError = action.payload;
            loadingPage(false);
            toastError(action.payload);
        },
    }
});

export const logIn = (data) => apiCall({
    url: "/login",
    method: "POST",
    headers: {
        'Content-type': 'application/x-www-form-urlencoded'
    },
    data,
    success: slice.actions.tokenReducer.type,
    error: slice.actions.errorReducer.type
});

export const checkCode = (data) => apiCall({
    url: "/user/check",
    method: "POST",
    data,
    success: slice.actions.checkCodeResult.type,
    error: slice.actions.checkCodeError.type
});
export const signUp = (data) => apiCall({
    url: "/user/signUp",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.checkTelResult.type,
    error: slice.actions.checkTelError.type
});

export const resetCode = (data) => apiCall({
    url: "/user/resetCode",
    method: "POST",
    params: {
        phoneNumber: data
    },
    success: slice.actions.resetCodeResult.type,
    error: slice.actions.resetCodeError.type
});


export const resetPassword = (data) => apiCall({
    url: "/user/resetPassword",
    method: "POST",
    data,
    success: slice.actions.checkTelResult.type,
    error: slice.actions.checkTelError.type
});

export const loadingPage = (data) => {
    return {
        type: slice.actions.loading.type,
        payload: data
    }
};


export const tokenNull = () => {
    return {
        type: slice.actions.tokenReducer.type,
        payload: null
    }
}


export default slice.reducer;
