import React, {useEffect} from 'react';
import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Container, Form, FormLabel, InputGroup, Row} from "react-bootstrap";
import {getRepoAllMonth} from "../report/ReportReducer";
import {loadingPage} from "../login/ReducerLogin";
import CustomTabs from "../more/CustomTabs";
import ProductPrice from "./ProductPrice";
import ExpressReport from "./ExpressReport";
import ReportsNew from "./ReportsNew";

function Reports() {
    const [currentTabs, setCurrentTabs] = useState(0);
    const [params, setParams] = useState({year: '', month: "", type: "pdf"});
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const report = useSelector(state => state.report);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
        } else {
            dispatch(loadingPage(false));
        }
    }, [report]);
    const submitRepo = (e) => {
        e.preventDefault();
        dispatch(getRepoAllMonth({
            ...params,
            year: parseInt(e.target.year.value),
            month: parseInt(e.target.month.value),
        }))
        setParams({
            ...params,
            year: parseInt(e.target.year.value),
            month: parseInt(e.target.month.value),
        });
        dispatch(loadingPage(true));
    }

    const setTabs = (num) => {
      setCurrentTabs(num);
    }
    return (
        <div>
            <CustomTabs list={[{name: "Oylik hisobot"},{name: "Tezkor hisobot"}, {name: "Mahsulotlar Narxi"}]} currentNum={setCurrentTabs}/>
            {currentTabs === 0 ?
                <ReportsNew/>
                : null}
            {currentTabs === 1 ? <ExpressReport setCurrentkidsNumber={setTabs} currentTabs={currentTabs}/>:null}
            {currentTabs === 2 ? <ProductPrice/> : null}
        </div>
    );
}

export default Reports;
