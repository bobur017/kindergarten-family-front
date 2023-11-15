import React, {useMemo} from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Form, Modal, Row, Table} from "react-bootstrap";
import {GrAdd} from "react-icons/gr";
import {addMtt, deleteMtt, editMtt, getMtt} from "./MttReducer";
import DropdownCustom from "../more/DropdownCustom";
import {getDepartment} from "../departments/RegionDepartmentReducer";
import NavbarHeader from "../more/NavbarHeader";


function Mtt() {
    const [show, setShow] = useState(false);
    const [mttState, setMttState] = useState({id: '', name: '', departmentId: '', number: '', street: ''});
    const [mtts, setMtts] = useState([]);
    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const mtt = useSelector(state => state.mtt)
    const departments = useSelector(state => state.department.departments)


    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(getMtt());
            handleClose();
        }
    }, [mtt.result]);

    useMemo(() => {
        setMtts(mtt.mtts);
    }, [mtt.mtts]);

    useMemo(() => {
        setMttState(mttState);
    }, [mttState]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getMtt());
            dispatch(getDepartment())
        }
    }, [])

    const submitMtt = (e) => {
        e.preventDefault();
        if (mttState.id !== '') {
            dispatch(editMtt(mttState));
        } else {
            dispatch(addMtt(mttState))
        }
    }
    const setNullDataToState = () => {
        setMttState({id: '', name: '', departmentId: '', number: '', street: ''})
        handleShow();
    }
    const onClickDepartment = (data, number) => {
        if (number === 1) {
            setMttState(data);
            handleShow();
        } else if (number === 2) {
            dispatch(deleteMtt(data));
        }
    }


    const onChanges = (e) => {
        console.log(e.target.name, e.target.value)
        setMttState({...mttState, [e.target.name]: e.target.value});
    }

    return (
        <div>
            <NavbarHeader name={"Magtabgacha ta'lim muassasalar bo'limi"} buttonName={"MTT qo'shish"}
                          handleShow={setNullDataToState}/>
            <br/>
            <Table bordered size='sm' className='text-center'>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Nomi</th>
                    <th>Tumani</th>
                    <th>Manzili</th>
                    <th>Holati</th>
                    <th>O'zgartirish</th>
                    <th>O'chirish</th>
                </tr>
                </thead>
                <tbody>
                {
                    mtts?.map((item, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.number + " - " + item.name}</td>
                            <td>{item.departmentName}</td>
                            <td>{item.street}</td>
                            <td>{item.status}</td>
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
                <Form onSubmit={submitMtt}>
                    <Modal.Header closeButton>
                        <Modal.Title>{mttState.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control name='name' required value={mttState.name} onChange={onChanges}
                                      placeholder="DMTT nomi "/>
                        <br/>
                        <Form.Control name='number' type={'number'} onWheel={(e) => e.target.blur()} required
                                      value={mttState.number} onChange={onChanges}
                                      placeholder="DMTT raqami "/>
                        <br/>
                        <Form.Control name='street' type={'text'} required value={mttState.street} onChange={onChanges}
                                      placeholder="DMTT manzil:ko'cha/mahalla "/>
                        <br/>
                        <Form.Select name={"departmentId"} value={mttState.departmentId} onChange={onChanges}>
                            <option value="DEFAULT">Bo'limni tanlang</option>
                            {
                                departments?.map((item, index) =>
                                    <option key={index} selected={mttState.departmentId === item.id}
                                            value={item.id}>{item.name}</option>
                                )
                            }
                        </Form.Select>
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

export default Mtt;