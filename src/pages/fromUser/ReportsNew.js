import React, {useEffect, useRef, useState} from 'react';
import {
    Button,
    Col,
    Container,
    Row
} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getBalances} from "./reducers/BalanceREducer";
import {getFileWithUrl, monthName} from "../more/Functions";
import CustomMedia from "../more/CustomMedia";
import {GrChapterNext, GrChapterPrevious} from "react-icons/gr";
import {loadingPage} from "../login/ReducerLogin";
import {getRepoAllMonth} from "../report/ReportReducer";

function ReportsNew() {
    const [desktop, setDesktop] = useState(false);
    const [payHistory, setPayHistory] = useState([]);
    const [year, setYear] = useState({year: new Date().getFullYear()});
    const billing = useSelector(state => state.balance.balances);
    const result = useSelector(state => state.balance.result);
    const {kidsNumber} = useSelector(state => state.report);
    const error = useSelector(state => state.balance.error);
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const desktopChange = (data) => {
        setDesktop(data);
    }
    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(getBalances(year))
            dispatch(loadingPage(false));
        }
    }, [result])

    // useEffect(() => {
    //     if (firstUpdate.current) {
    //         getFileWithUrl(kidsNumber,"Hisobot");
    //     }
    //         dispatch(loadingPage(false));
    // }, [kidsNumber]);

    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(loadingPage(false));
        }
    }, [error]);

    useEffect(() => {
        setPayHistory(billing);
    }, [billing])

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getBalances(year))
        }
    }, []);

    const getReportMonth = (data) => {
        dispatch(getRepoAllMonth({
            year: data.year,
            month: data.month,
        }))
        dispatch(loadingPage(true));
    }

    const getYear = (data) => {
        setYear({year: data});
        dispatch(getBalances({year: data}));
    }

    return (
        <div className={"figma-card"}>
            <br/>
            <Container fluid>
                <Row className={'justify-content-center'}>
                    <Col className={'d-flex text-center justify-content-center'}>
                        <Button variant={"outline-dark"} size={'sm'} onClick={() => getYear(year.year - 1)}
                                className={'mx-3'}><GrChapterPrevious/></Button>
                        <div>{year.year} - yil</div>
                        <Button variant={"outline-dark"} size={'sm'}
                                onClick={() => getYear(year.year + 1)} className={'mx-3'}><GrChapterNext/></Button>
                    </Col>
                </Row>
            </Container>
            <br/>
            <table className={'table table-bordered text-center'} style={{fontSize:14}}>
                <thead>
                <tr>
                    <td>#</td>
                    <td>Oy</td>
                    <td>To'lov holati</td>
                    <td>Holat</td>
                </tr>
                </thead>
                <tbody>
                {
                    payHistory.map((item, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{monthName(item.month)}</td>
                            <td style={{color:item?.paymentStatus?'green':'red'}}>{item?.paymentStatus ? <span>To'langan</span>:<span>To'lanmagan</span>}</td>
                            <td>
                                {item?.state ? <Button variant="outline-success" size={"sm"}
                                         onClick={() => getReportMonth(item)}>Yuklash</Button>:
                                <span>Ma'lumot yo'q</span>
                                }
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <CustomMedia func={desktopChange} myMedia={'(min-width: 320px)'}/>
        </div>
    );
}

export default ReportsNew;
