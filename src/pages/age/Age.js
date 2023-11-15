import React from 'react';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAge, deleteAge, editAge, getAge } from "./AgeReducer";
import { Button, Form, Modal, Row, Table } from "react-bootstrap";
import NavbarHeader from "../more/NavbarHeader";


function Age() {
    const [show, setShow] = useState(false);
    const [ageState, setAgeState] = useState({ id: '', name: '' });
    const [ages, setAges] = useState([]);
    const handleClose = () => {
        setShow(false);
        setAgeState({ id: '', name: '' });
    };
    const handleShow = () => {
        setShow(true)
    };


    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const age = useSelector(state => state.age)


    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(getAge());
            handleClose();
        }
    }, [age.result])

    useEffect(() => {
        setAges(age.ages);
    }, [age.ages]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getAge());
        }
    }, [])

    const submitAge = (e) => {
        e.preventDefault();
        if (ageState.id !== '') {
            dispatch(editAge(ageState));
        } else {
            dispatch(addAge(ageState))
        }
    }
    const onClickDepartment = (data, number) => {
        if (number === 1) {
            setAgeState(data);
            handleShow();
        } else if (number === 2) {
            dispatch(deleteAge(data));
        }
    }


    const onChanges = (param) => (e) => {
        setAgeState({ ...ageState, [param]: e.target.value });
    }

    return (
        <div>
            <NavbarHeader name={"Yosh toifalari bo'limi"} handleShow={handleShow} buttonName={"Yosh toifasini_qo'shish"}/>
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
                        ages?.map((item, index) =>
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
                <Form onSubmit={submitAge}>
                    <Modal.Header closeButton>
                        <Modal.Title>{ageState.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control name='name' required value={ageState.name} onChange={onChanges("name")}
                            placeholder="Nomi " />
                        <br />
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

export default Age;