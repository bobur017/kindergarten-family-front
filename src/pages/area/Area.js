import React from 'react';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addArea, deleteArea, editArea, getArea } from "./AreaReducer";
import { Button, Form, Modal, Row, Table } from "react-bootstrap";
import NavbarHeader from "../more/NavbarHeader";


function Area() {
    const [show, setShow] = useState(false);
    const [areaState, setAreaState] = useState({ id: '', name: '' });
    const [areas, setAreas] = useState([]);
    const handleClose = () => {
        setShow(false);
        setAreaState({ id: '', name: '' });
    };
    const handleShow = () => {
        setShow(true)
    };


    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const area = useSelector(state => state.area)


    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(getArea());
            handleClose();
        }
    }, [area.result])

    useEffect(() => {
        setAreas(area.areas);
    }, [area.areas]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getArea());
        }
    }, [])

    const submitArea = (e) => {
        e.preventDefault();
        if (areaState.id !== '') {
            dispatch(editArea(areaState));
        } else {
            dispatch(addArea(areaState))
        }
    }
    const onClickDepartment = (data, number) => {
        if (number === 1) {
            setAreaState(data);
            handleShow();
        } else if (number === 2) {
            dispatch(deleteArea(data));
        }
    }


    const onChanges = (param) => (e) => {
        setAreaState({ ...areaState, [param]: e.target.value });
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
                        areas?.map((item, index) =>
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
                <Form onSubmit={submitArea}>
                    <Modal.Header closeButton>
                        <Modal.Title>{areaState.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control name='name' required value={areaState.name} onChange={onChanges("name")}
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

export default Area;
