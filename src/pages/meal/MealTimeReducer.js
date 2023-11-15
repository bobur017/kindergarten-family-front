import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../ApiCall";
import {getToken, toastError} from "../more/Functions";

const slice = createSlice({
    name: "mealTime",
    initialState: {
        result: {},
        error: {},
        mealTimes: [],
    },
    reducers: {
        mealTimes: (state, action) => {
            state.mealTimes = action.payload;
        },
        resultReducer: (state, action) => {
            state.result = action.payload;
            toast.success(action.payload?.text);
        },
        errorReducer: (state, action) => {
            state.error = action.payload;
            toastError(action.payload);
        },
    }
});

export const getMealTime = () => apiCall({
    url: "/mealTime",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.mealTimes.type,
    error: slice.actions.errorReducer.type
})

export const deleteMealTime = (data) => apiCall({
    url: "/mealTime/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const addMealTime = (data) => apiCall({
    url: "/mealTime",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editMealTime = (data) => apiCall({
    url: "/mealTime/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})
export default slice.reducer;