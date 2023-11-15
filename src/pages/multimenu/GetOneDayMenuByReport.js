import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {getMenuOneByrReport} from "./MultiMenuReducer";
import {Card, Col, Container, Modal, Offcanvas, Row, Table} from "react-bootstrap";
import {getRoleStorage, tableRowCustomTd3} from "../more/Functions";
import {getMeals} from "../meal/MealReducer";
import {baseUrl} from "../../Default";

function GetOneDayMenu() {
    const [state, setState] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();
    const history = useNavigate();
    const stateSelector = useSelector(state => state.multiMenu.menu)
    const mealState = useSelector(state => state.meal.meal)
    const firstUpdate = useRef(false);
    const reportId = useParams("id");
    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getMenuOneByrReport(reportId?.id))
        } else {
            console.log(stateSelector, "stateSelector");
        }
    }, [stateSelector]);
    const backFromRole = (text) => {
        return "/sidebar/user/menu";
    }
    const getOneMeal = (id) => {
        dispatch(getMeals(id, reportId?.id));
        handleShow();
    }

    return (
        <div>
            <div className={'figma-card'}>
                <button className={"buttonPdf"} onClick={() => history(backFromRole(getRoleStorage()))}>ORTGA</button>
                <Col xs={12} sm={12} md={12}
                     className={'text-center mt-3'}>
                    <Card className={'m-0'}>
                        <Card.Header
                            style={{backgroundColor: '#d7d6d6'}}>{stateSelector?.multiMenuName}sini</Card.Header>
                        <Card.Header style={{backgroundColor: '#d7d6d6'}}>{stateSelector?.name}</Card.Header>
                        <Container fluid>
                            <Row className={'justify-content-center text-center'}>
                                {
                                    stateSelector?.mealTimeStandardList?.map((mealTime, index2) =>
                                        <Col key={index2} xs={12} sm={12} md={6} lg={6} xl={6}>
                                            <div
                                                className={'w-100 d-flex justify-content-between my-2 fw-bolder'}>{mealTime.mealTimeName}
                                            </div>
                                            <div className={'miniTable1'}>
                                                <table>
                                                    <thead>
                                                    <tr style={{fontSize: 20}}>
                                                        <th>#</th>
                                                        <th>Taom nomi</th>
                                                        <th>Yosh toifalari</th>
                                                        <th>Miqdori</th>
                                                    </tr>
                                                    </thead>
                                                    {mealTime?.mealAgeStandardList?.map((meal, index3) => {
                                                            return (
                                                                <tbody key={index3}>
                                                                <tr style={{fontSize: 20}}>
                                                                    <td rowSpan={meal.ageStandardList.length}>{index3 + 1}</td>
                                                                    <td rowSpan={meal.ageStandardList.length}
                                                                        onClick={() => getOneMeal(meal?.id)}>{meal.mealName}</td>
                                                                    <td>
                                                                        {
                                                                            meal?.ageStandardList[0].ageGroupName
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {meal?.ageStandardList[0].weight}
                                                                    </td>

                                                                </tr>
                                                                {
                                                                    tableRowCustomTd3(meal?.ageStandardList)
                                                                }
                                                                </tbody>
                                                            )
                                                        }
                                                    )}
                                                </table>
                                            </div>
                                        </Col>
                                    )
                                }
                            </Row>
                        </Container>
                    </Card>
                </Col>
            </div>
            <div>
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Taomni tayyorlashdagi mahsulotlari</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <img src={baseUrl() + mealState.attachmentId} width={'100%'}/>
                        <Card>
                            <Card.Header>
                                {mealState.name} taomini tarkibi
                            </Card.Header>
                            <Card.Body>
                                <Table>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Mahsulot</th>
                                        <th>Vazni</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        mealState?.productMealList?.map((item, index) =>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.weight}</td>
                                            </tr>
                                        )
                                    }
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Header>
                                {mealState.name} taomini umumiy malumotlari
                            </Card.Header>
                            <Card.Body>
                                <Table>
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Tayyorlanish vazni</td>
                                        <td>{mealState.weight}</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Taom turi</td>
                                        <td>{mealState.mealCategoryName}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}>
                                            <strong>
                                                Qo'shimcha ma'lumotlar:
                                            </strong>
                                            <br/>
                                            <br/>
                                            {mealState.comment}</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </div>
    );
}

export default GetOneDayMenu;
