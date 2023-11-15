import React from 'react';
import { useEffect, useRef, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";

export const baseUrl = () => {
    return "http://26.160.120.197:8899/out/api";
    // return "https://mtt-menyu.uz/out/api";
}
export const baseUrl2 = () => {
    return "http://26.160.120.197:8899";
    // return "https://mtt-menyu.uz";
}

function Default(props) {
    const pathId = useParams("id");
    const [state, setState] = useState();
    const dispatch = useDispatch();
    const history = useNavigate();
    const stateSelector = useSelector(state => state.multiMenu.menu)
    const firstUpdate = useRef(false);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
        }
    }, [])

    return (
        <div></div>
    );
}

export default Default;
