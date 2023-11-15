import React from 'react';
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {GrChapterNext, GrChapterPrevious} from "react-icons/gr";
import {monthName} from "../more/Functions";
import {getChildrenNumbers} from "./reducers/ChildrenNumberReducer";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

function Calendar({getDayItem}) {


    const [childrenNumberState, setChildrenNumberState] = useState();
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const childrenNumber = useSelector(state => state.childrenNumber)


    useEffect(() => {
        console.log(childrenNumber)
        setChildrenNumberState(childrenNumber)
    }, [childrenNumber]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getChildrenNumbers());
        }
    }, [])


    const td = (list, indexes) => {
        let myList = []
        if (indexes === 0) {
            myList = list?.slice(indexes, indexes + 7);
        } else {
            myList = list?.slice(indexes + 1, indexes + 8);
        }
        return (
            myList?.map((item, index) =>
                <td key={index} style={index === 6 || index === 5 ? {color: '#e70000'} : null} onClick={()=>getDayItem(item)} className={"my-hover"}>
                    <div className={item?.menuId !== null ? "tdColor" : null}
                         style={item.numberOfChildren !== null ? {backgroundColor: '#bcfcd4'} : null}>
                        {item.day !== 0 ? item.day : null}</div>
                </td>
            )
        )
    }
    const getCalendar = (month1, year1, num) => {
        let month = month1;
        let year = year1;
        if (num === 1) {
            if (month === 13) {
                month = 1;
                year = year + 1
            }
        } else {
            if (month === 0) {
                month = 12;
                year = year - 1
            }
        }
        // console.log({month, year})
        dispatch(getChildrenNumbers({month, year}))
    }
    return (

        <Container fluid>
            <Row className={'justify-content-center'}>
                <Col>
                    <Row>
                        <Col className={"justify-content-start d-flex"}>
                            <div className={"childrenColor mt-2"}></div>
                            <div className={"info-text mx-3"}>Bolalar soni kiritilgan kunlar</div>
                        </Col>
                        <Col className={"info-text justify-content-start d-flex"}>
                            <div className={"menuColor  mt-2"}></div>
                            <div className={"info-text mx-3"}>
                                Menu biriktirilgan kunlar
                            </div>
                        </Col>
                    </Row>
                    <br/>
                    <Row className={'justify-content-center shadow text-center'}>
                        <Col xs={2} sm={2} md={2} lg={2} xl={2}><Button variant={"outline-dark"}
                                                                        onClick={() => getCalendar(childrenNumberState?.childrenNumbers.month - 1, childrenNumberState?.childrenNumbers.year, 2)}><GrChapterPrevious/></Button></Col>
                        <Col xs={8} sm={8} md={8} lg={8}
                             xl={8}>{monthName(childrenNumberState?.childrenNumbers.month)} , {childrenNumberState?.childrenNumbers.year}-yil</Col>
                        <Col xs={2} sm={2} md={2} lg={2} xl={2}><Button
                            variant={"outline-dark"}
                            onClick={() => getCalendar(childrenNumberState?.childrenNumbers.month + 1, childrenNumberState?.childrenNumbers.year, 1)}><GrChapterNext/></Button></Col>
                    </Row>
                    <Table bordered className={"text-center"}>
                        <thead>
                        <tr>
                            <th className={"thBackground"}>№</th>
                            <th className={"thBackground"}>Du</th>
                            <th className={"thBackground"}>Se</th>
                            <th className={"thBackground"}>Ch</th>
                            <th className={"thBackground"}>Pa</th>
                            <th className={"thBackground"}>Ju</th>
                            <th className={"thBackground"}>SH</th>
                            <th className={"thBackground"}>Ya</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            childrenNumberState?.childrenNumbers?.dayList?.map((item, index) => {
                                if ((index + 1) % 7 === 0 || index === 0) {
                                    return (
                                        <tr key={index}>
                                            <td className={"thBackground"}>{index === 0 ? (index + 1) : ((index + 1) / 7) + 1}</td>
                                            {td(childrenNumberState?.childrenNumbers?.dayList, index)}
                                        </tr>
                                    )
                                }
                            })
                        }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default Calendar;