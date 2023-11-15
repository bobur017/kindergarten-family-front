import React from 'react';
import {useDispatch} from "react-redux";
import {loadingPage} from "../login/ReducerLogin";

function LoadingStop({state}) {
    const dispatch = useDispatch();
    dispatch(loadingPage(state));
    return (
        <div></div>
    );
}

export default LoadingStop;
