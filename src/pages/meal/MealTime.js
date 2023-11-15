import React from 'react';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMealTime, deleteMealTime, editMealTime, getMealTime } from "./MealTimeReducer";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import NavbarHeader from "../more/NavbarHeader";
import CheckBoxCustom from "../more/CheckBoxCustom";
import {getAge} from "../age/AgeReducer";


function MealTime() {
    const [show, setShow] = useState(false);
    const [edited, setEdited] = useState(false);
    const [mealTimeState, setMealTimeState] = useState({ id: '', name: '' });
    const [mealTimes, setMealTimes] = useState([]);
    const handleClose = () => {
        setShow(false);
        setMealTimeState({ id: '', name: '' ,ageGroupIdList:[]});
    };
    const handleShow = () => {
        setShow(true)
    };


    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const mealTime = useSelector(state => state.mealTime)
    const ages = useSelector(state => state.age.ages)

    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(getMealTime());
            handleClose();
        }
    }, [mealTime.result])

    useEffect(() => {
        setMealTimes(mealTime.mealTimes);
    }, [mealTime.mealTimes]);


    useEffect(() => {
        if (firstUpdate.current !== true) {
            firstUpdate.current = true;
            dispatch(getMealTime());
            dispatch(getAge());
        }
    }, [])

    const submitMealTime = (e) => {
        e.preventDefault();
        if (mealTimeState.id !== '') {
            dispatch(editMealTime({...mealTimeState,ageGroupList:mealTimeState.ageGroupList.filter(item=>item.checked).map(item => item.id)}));
        } else {
            dispatch(addMealTime({...mealTimeState,ageGroupList:mealTimeState.ageGroupList.filter(item=>item.checked).map(item => item.id)}));
        }
    }
    const onClickDepartment = (data, number) => {
        if (number === 1) {
            setMealTimeState(data);
            setEdited(true);
            handleShow();
        } else if (number === 2) {
            dispatch(deleteMealTime(data));
        }
    }


    const onChanges = (param) => (e) => {
        setMealTimeState({ ...mealTimeState, [param]: e.target.value });
    }

    const getChecked = (list) => {
        setMealTimeState({...mealTimeState,ageGroupList:list});
    }

    return (
        <div>
            <NavbarHeader name={"Taom vaqtlari bo'limi"} handleShow={handleShow} buttonName={"Taom_vaqtini_qo'shish"}/>
            <br />
            <Table bordered size='sm' className='text-center'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nomi</th>
                        <th>O'zgartirish</th>
                        <th>O'chirish</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        mealTimes?.map((item, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>
                                    <Button variant='outline-info' size='sm' onClick={() => onClickDepartment(item, 1)}>
                                        O'zgartirish
                                    </Button>
                                </td>
                                <td>
                                    <Button variant='outline-danger' size='sm' onClick={() => onClickDepartment(item, 2)}>
                                        O'chirish
                                    </Button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={submitMealTime}>
                    <Modal.Header closeButton>
                        <Modal.Title>{mealTimeState.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label style={{color:"#00b2ff"}}>Nomi</Form.Label>
                        <Form.Control name='name' required value={mealTimeState.name} onChange={onChanges("name")}
                            placeholder="Nomi "  />
                        <br />
                        <CheckBoxCustom edited={edited} editList={mealTimeState?.ageGroupList} list={ages} getChecked={getChecked}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Ortga
                        </Button>
                        <Button variant="primary" type='submit'>
                            Tayyor
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default MealTime;