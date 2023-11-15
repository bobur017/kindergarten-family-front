import React, {forwardRef, useImperativeHandle} from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addChildren, deleteChildren, editChildren, getChildren} from "./reducers/ChildrenReducer";
import {Button, Form, Modal, Table} from "react-bootstrap";
import {AiTwotoneDelete} from "react-icons/ai";
import {BsFillPenFill} from "react-icons/bs";
import {useMediaQuery} from "react-responsive";

const ChildrenList = forwardRef((props, ref) => {
    const defaultObj = {
        "age": '',
        "birthDay": "",
        "fatherName": "",
        "gender": "string",
        "id": '',
        "kindergartenId": '',
        "kindergartenName": "",
        "name": "",
        "phoneNumber": "",
        "status": '',
        "surname": ""
    };
    const [show, setShow] = useState(false);
    const [childrenState, setChildrenState] = useState(defaultObj);
    const [childrens, setChildrens] = useState([]);
    const handleClose = () => {
        setShow(false);
        setChildrenState(defaultObj);
    };
    const isDesktop = useMediaQuery({query: '(min-width: 424px)'});
    const handleShow = () => {
        setShow(true)
    };
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const children = useSelector(state => state.children)

    useImperativeHandle(ref, () => ({
        showModal() {
            handleShow();
        }
    }))

    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(getChildren());
        }
    }, [children.result])

    useEffect(() => {
        setChildrens(children.childrens);
    }, [children.childrens]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getChildren());
        }
    }, [])

    const submitChildren = (e) => {
        e.preventDefault();
        if (childrenState.id !== '') {
            dispatch(editChildren(childrenState));
        } else {
            dispatch(addChildren(childrenState))
        }
        handleClose();
    }
    const onClickDepartment = (data, number) => {
        if (number === 1) {
            setChildrenState(data);
            handleShow();
        } else if (number === 2) {
            dispatch(deleteChildren(data));
        }
    }


    const onChanges = (e) => {
        setChildrenState({...childrenState, [e.target.name]: e.target.value});
    }

    return (
        <div>
            <div style={{overflowX:'scroll'}}>
                <table className={!isDesktop ? 'table-bordered text-center' : 'table table-bordered text-center'}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Ism,Familya</th>
                        <th>Tug'ilgan sana</th>
                        <th>yoshi</th>
                        <th>O'zg</th>
                        <th>O'ch</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        childrens?.map((item, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name} <br/> {item.surname}</td>
                                <td>{item.birthDay.join('-')}</td>
                                <td>{item.age}</td>
                                <td>
                                    <Button variant='outline-info' size='sm' onClick={() => onClickDepartment(item, 1)}>
                                        <BsFillPenFill/>
                                    </Button>
                                </td>
                                <td>
                                    <Button variant='outline-danger' size='sm'
                                            onClick={() => onClickDepartment(item, 2)}>
                                        <AiTwotoneDelete/>
                                    </Button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={submitChildren}>
                    <Modal.Header closeButton>
                        <Modal.Title>{childrenState.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Text>Ismi</Form.Text>
                        <Form.Control name='name' required value={childrenState.name} onChange={onChanges}
                                      placeholder="Ismi"/>
                        <br/>
                        <Form.Text>Familyasi</Form.Text>
                        <Form.Control name='surname' required value={childrenState.surname} onChange={onChanges}
                                      placeholder="Familyasi"/>
                        <br/>
                        <Form.Text>Sharifi</Form.Text>
                        <Form.Control  name='fatherName' required value={childrenState.fatherName}  onChange={onChanges}
                                      placeholder="Sharifi"/>
                        <br/>
                        <Form.Text> Tug'ilgan sana</Form.Text>
                        <Form.Control name='birthDay' type={'date'} required value={childrenState.birthDay}
                                      onChange={onChanges}
                                      placeholder="Tug'ilgan sana"/>
                        <br/>
                        <Form.Text> Jinsi</Form.Text>
                        <Form.Select name='gender' required onChange={onChanges}
                                     placeholder="Jinsi">
                            <option value="">Tanlang</option>
                            <option value="qiz bola">Qiz bola</option>
                            <option value="og'il bola">O'g'il bola</option>
                        </Form.Select>
                        <br/>
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
    )
})

export default ChildrenList;