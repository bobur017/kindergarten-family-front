import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../ApiCall";
import {getToken, toastError} from "../more/Functions";

const slice = createSlice({
    name: "mealCategory",
    initialState: {
        result: {},
        error: {},
        mealCategories: [],
    },
    reducers: {
        mealCategories: (state, action) => {
            state.mealCategories = action.payload;
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

export const getMealCategory = () => apiCall({
    url: "/mealCategory",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.mealCategories.type,
    error: slice.actions.errorReducer.type
})

export const deleteMealCategory = (data) => apiCall({
    url: "/mealCategory/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const addMealCategory = (data) => apiCall({
    url: "/mealCategory",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editMealCategory = (data) => apiCall({
    url: "/mealCategory/" + data.id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})
export default slice.reducer;