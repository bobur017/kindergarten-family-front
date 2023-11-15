import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {apiCall} from "../../ApiCall";
import {getToken, toastError} from "../more/Functions";

const slice = createSlice({
    name: "meal",
    initialState: {
        result: {},
        error: {},
        meals: [],
        meal: {},
    },
    reducers: {
        meal: (state, action) => {
            state.meal = action.payload;
        },
        meals: (state, action) => {
            state.meals = action.payload;
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

export const getMeal = () => apiCall({
    url: "/meal",
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.meals.type,
    error: slice.actions.errorReducer.type
})

export const getMeals = (mealId, reportId) => apiCall({
    url: "/menu/getMeal/" + reportId,
    method: "GET",
    headers: {
        Authorization: getToken(),
    },
    params: {mealId},
    success: slice.actions.meal.type,
    error: slice.actions.errorReducer.type
})

export const deleteMeal = (data) => apiCall({
    url: "/meal/" + data.id,
    method: "DELETE",
    headers: {
        Authorization: getToken(),
    },
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const addMeal = (data) => apiCall({
    url: "/meal",
    method: "POST",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})

export const editMeal = (data, id) => apiCall({
    url: "/meal/" + id,
    method: "PUT",
    headers: {
        Authorization: getToken(),
    },
    data,
    success: slice.actions.resultReducer.type,
    error: slice.actions.errorReducer.type
})
export default slice.reducer;
