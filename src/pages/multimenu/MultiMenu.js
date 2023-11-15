import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Form, InputGroup, Modal, Table} from "react-bootstrap";
import NavbarHeader from "../more/NavbarHeader";
import {getMealTime} from "../meal/MealTimeReducer";
import {addAge, editAge} from "../age/AgeReducer";
import {addMultiMenu, deleteMultiMenu, editMultiMenu, getMultiMenu} from "./MultiMenuReducer";
import {useNavigate} from "react-router-dom";

function MultiMenu() {
    const defaultData = {
        id: '',
        "daily": '',
        "mealTimeIdList": [],
        "name": ""
    }
    const [multiMenuState, setMultiMenuState] = useState(defaultData);
    const [multiMenuList, setMultiList] = useState();
    const [number, setNumber] = useState(0);
    const dispatch = useDispatch();
    const mealTimes = useSelector(state => state.mealTime.mealTimes);
    const multiMenu = useSelector(state => state.multiMenu);
    const firstUpdate = useRef(false);
    const [show, setShow] = useState(false);
    const history = useNavigate();
    const handleClose = () => {
        setMultiMenuState(defaultData);
        setShow(false);
        setNumber(0);
    };
    const handleShow = (num, data) => {
        if (num === 1) {
            setMultiMenuState({...multiMenuState, mealTimeIdList: mealTimes});
            setShow(true);
        } else if (num === 2) {
            setNumber(2);
            setMultiMenuState(data);
            setShow(true);
        } else if (num === 3) {
            dispatch(deleteMultiMenu(data));
        }
    };


    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(getMultiMenu());
            handleClose();
        }
    }, [multiMenu.result]);
    useEffect(() => {
        setMultiList(multiMenu.multiMenuList)
    }, [multiMenu.multiMenuList]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getMealTime());
            dispatch(getMultiMenu());
        }
    }, []);

    const submitData = (e) => {
        e.preventDefault();
        if (multiMenuState.id !== '') {
            dispatch(editMultiMenu({name: multiMenuState.name}, multiMenuState));
        } else {
            dispatch(addMultiMenu({
                ...multiMenuState,
                mealTimeIdList: multiMenuState.mealTimeIdList.filter(item => item.checked).map(item => item.id)
            }));
        }
    }

    const onChangeItem = (index) => (e) => {
        if (e.target.name !== "mealTimeIdList") {
            setMultiMenuState({...multiMenuState, [e.target.name]: e.target.value})
        } else {
            let list = [...multiMenuState.mealTimeIdList];
            list[index] = {...list[index], checked: e.target.checked}
            setMultiMenuState({...multiMenuState, mealTimeIdList: list});
        }
    }
    const pushUrl = (data) => {
      history("/sidebar/admin/multi-menu-one/"+data.id);
    }

    return (
        <div>
            <NavbarHeader name={"Taomnomalar bo'limi"} buttonName={"Taomnoma qo'shish"}
                          handleShow={() => handleShow(1)}/>

            <Table hover>
                <thead>
                <tr>
                    <th className={'my-Hover'}>#</th>
                    <th className={'my-Hover'}>Nomi</th>
                    <th className={'my-Hover'}>Tayyorlanish vazni</th>
                    <td>O'zgartirish</td>
                    <td>O'chirish</td>
                </tr>
                </thead>
                <tbody>
                {
                    multiMenuList?.map((item, index) =>
                        <tr key={index}>
                            <td className={'my-Hover'} onClick={() => pushUrl(item)}>{index + 1}</td>
                            <td className={'my-Hover'} onClick={() => pushUrl(item)}>{item.name}</td>
                            <td className={'my-Hover'} onClick={() => pushUrl(item)}>{item.daily}</td>
                            <td><Button variant={"outline-info"} size={"sm"}
                                        onClick={() => handleShow(2, item)}>O'zgartirish</Button></td>
                            <td><Button variant={"outline-danger"} size={"sm"}
                                        onClick={() => handleShow(3, item)}>O'chirish</Button></td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={submitData}>
                    <Modal.Header closeButton>
                        <Modal.Title>Taomnoma</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label>Nomi</Form.Label>
                        <Form.Control type={'text'} required name={'name'} value={multiMenuState.name}
                                      onChange={onChangeItem(null)}/>
                        {number === 2 ? null : <>
                            <br/>
                            <Form.Label>Kunlar soni</Form.Label>
                            <Form.Control name={'daily'} type={'number'} onWheel={(e) => e.target.blur()} required
                                          onChange={onChangeItem(null)}/>
                            <br/>

                            <Form.Label>Ovqatlanish vaqtlari</Form.Label>
                            {multiMenuState?.mealTimeIdList?.map((item, index) =>
                                <div key={index}>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>{item.name}</InputGroup.Text>
                                        <InputGroup.Checkbox type={'checkbox'}
                                                             checked={item.checked ? item.checked : false}
                                                             onChange={onChangeItem(index)}
                                                             name={"mealTimeIdList"}/>
                                    </InputGroup>
                                </div>
                            )}
                        </>}
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
            </Modal>
        </div>
    );
}

export default MultiMenu;
