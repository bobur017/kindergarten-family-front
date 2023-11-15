import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, Container, Form, InputGroup, Modal, Offcanvas, Row, Table} from "react-bootstrap";
import NavbarHeader from "../more/NavbarHeader";
import {getAge} from "../age/AgeReducer";
import {addMultiMenuMeal, deleteMultiMenuOne, getMultiMenuOne} from "./MultiMenuReducer";
import {useNavigate, useParams} from "react-router-dom";
import {getMeal} from "../meal/MealReducer";
import DropdownCustom from "../more/DropdownCustom";
import {getRoleStorage, tableRowCustomTd3} from "../more/Functions";

function MultiMenuOne() {
    const defaultData = {
        id: '', "ageStandardList": [
            {
                "ageGroupId": '',
                "weight": ''
            }
        ],
        "mealId": '',
        mealName: ''
    };
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setNumber(0);
    };

    const handleShow = (num, data) => {
        if (num === 1) {
            setNumber(num);
            setMealState({
                ...mealState,
                ageStandardList: data?.ageStandardList,
                id: data?.id,
                mealName: '',
                mealId: ''
            });
        } else if (num === 2) {
            setNumber(num);
        }
        setShow(true);
    };

    const [showCanvas, setShowCanvas] = useState(false);

    const handleCloseCanvas = () => setShowCanvas(false);
    const handleShowCanvas = () => setShowCanvas(true);

    const [multiMenuState, setMultiMenuState] = useState({});
    const [mealState, setMealState] = useState(defaultData);
    const [multiMenuId, setMultiMenuId] = useState(useParams("id"));
    const [number, setNumber] = useState(0);
    const dispatch = useDispatch();
    const meals = useSelector(state => state.meal.meals);
    const multiMenu = useSelector(state => state.multiMenu);
    const firstUpdate = useRef(false);

    const history = useNavigate();
    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(getMultiMenuOne(multiMenuId?.id));
            handleClose();
        }
    }, [multiMenu.result]);

    useEffect(() => {
        setMultiMenuState(multiMenu.multiMenu);
    }, [multiMenu.multiMenu]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            if (getRoleStorage() === "ROLE_ADMIN") {
                dispatch(getAge());
                dispatch(getMeal());
            }
                dispatch(getMultiMenuOne(multiMenuId?.id));
        }
    }, []);

    const submitData = (e) => {
        e.preventDefault();
        dispatch(addMultiMenuMeal(mealState));
    }

    const onChangeItem = (index, data) => (e) => {
        let list = [...mealState.ageStandardList];
        list[index] = {...list[index], [e.target.name]: e.target.value, ageGroupId: data.id}
        setMealState({...mealState, ageStandardList: list});
    }

    const getMealOnclicked = (data) => {
        setMealState({...mealState, mealName: data.name, mealId: data.id})
    }
    const renderAddMealToMenu = () => {
        return (
            <Form onSubmit={submitData}>
                <Modal.Header closeButton>
                    <Modal.Title>Taomnoma</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DropdownCustom name={"Taomlar"} setData={getMealOnclicked} list={meals}/>
                    <br/>
                    <Form.Control type={"text"} disabled
                                  value={"Taom nomi : " + mealState.mealName} required onChange={onChangeItem()}/>
                    <br/>
                    {
                        mealState.ageStandardList?.map((item, index) =>
                            <InputGroup size="sm" className="mb-3" key={index}>
                                <InputGroup.Text id="inputGroup-sizing-sm"
                                                 style={{width: '70%'}}>{item.name}</InputGroup.Text>
                                <Form.Control type={'number'} step={"0.01"} required name={"weight"} size={'sm'}
                                              value={item.weight ? item.weight : ""}
                                              onWheel={(e) => e.target.blur()}
                                              placeholder={"vazni"} onChange={onChangeItem(index, item)}/>
                            </InputGroup>
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Yopish
                    </Button>
                    <Button variant="primary" type={'submit'}>
                        Saqlash
                    </Button>
                </Modal.Footer>
            </Form>
        )
    }
    const myRender = () => {
        if (number === 1) {
            return renderAddMealToMenu();
        }
    }
    const deleteOnclick = (data) => {
        dispatch(deleteMultiMenuOne(data))
    }

    const backFromRole = (text) => {
        if (text === "ROLE_ADMIN") {
            return "/sidebar/admin/multiMenu";
        } else {
            return "/sidebar/user/menu";
        }
    }

    return (
        <div>
            <NavbarHeader name={multiMenuState.name + " taomnoma"}
                          handleShow={handleShowCanvas}/>

            <button className={"buttonPdf m-3"} onClick={() => history(backFromRole(getRoleStorage()))}>ORTGA</button>
            <Container fluid>
                <Row>
                    {
                        multiMenuState?.menuList?.map((menu, index) =>
                            <Col key={index} xs={12} sm={12} md={12} lg={6} xl={6} className={'text-center'}>
                                <Card>
                                    <Card.Header>{menu.name}</Card.Header>

                                    <Container fluid>
                                        <Row className={'justify-content-center text-center'}>
                                            {
                                                menu?.mealTimeStandardList?.map((mealTime, index2) =>
                                                    <Col key={index2} xs={12} sm={12} md={12} lg={12} xl={12}>
                                                        <div>{mealTime?.mealTimeName} {getRoleStorage() === "ROLE_ADMIN" ?
                                                            <Button variant={"light"}
                                                                    size={"sm"}
                                                                    onClick={() => handleShow(1, mealTime)}>
                                                                Taom qo'shish</Button> : null}</div>
                                                        <Table bordered className={"my-table-first"}>
                                                            <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>Taom nomi</th>
                                                                <th>Yosh toifalari</th>
                                                                <th>Miqdori</th>
                                                                {getRoleStorage() === "ROLE_ADMIN" ?
                                                                    <th>O'chirish</th> : null}
                                                            </tr>
                                                            </thead>
                                                            {mealTime?.mealAgeStandardList?.map((meal, index3) => {
                                                                    return (
                                                                        <tbody key={index3}>
                                                                        <tr>
                                                                            <td rowSpan={meal.ageStandardList.length}>{index3 + 1}</td>
                                                                            <td rowSpan={meal.ageStandardList.length}>{meal.mealName}</td>
                                                                            <td>
                                                                                {
                                                                                    meal?.ageStandardList[0].ageGroupName
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {meal?.ageStandardList[0].weight}
                                                                            </td>
                                                                            {getRoleStorage() === "ROLE_ADMIN" ?
                                                                                <td rowSpan={meal.ageStandardList.length}>
                                                                                    <Button variant={"outline-danger"}
                                                                                            size={"sm"}
                                                                                            onClick={() => deleteOnclick(meal)}>
                                                                                        O'chiirish
                                                                                    </Button>
                                                                                </td> : null}
                                                                        </tr>
                                                                        {
                                                                            tableRowCustomTd3(meal?.ageStandardList)
                                                                        }
                                                                        </tbody>
                                                                    )
                                                                }
                                                            )}
                                                        </Table>
                                                    </Col>
                                                )
                                            }
                                        </Row>
                                    </Container>
                                </Card>
                            </Col>
                        )
                    }
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                {
                    myRender()
                }
            </Modal>
            <Offcanvas show={showCanvas} onHide={handleCloseCanvas}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
        ;
}

export default MultiMenuOne;
