import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    addKindergarten,
    deleteKindergarten,
    editKindergarten,
    getKindergartenCurrent
} from "./KindergartenReducer";
import {Button, Form, FormText, Modal, Row, Table} from "react-bootstrap";
import Address from "../address/Address";

function Kindergarten({getList}) {
    const [show, setShow] = useState(false);
    const [kindergartenState, setKindergartenState] = useState();
    const [kindergartens, setKindergartens] = useState();
    const handleClose = () => {
        setShow(false);
        setKindergartenState({
            id:'',
            districtId:'',
            "name": "",
            "number": '',
            "status": "",
            "street": ""});
    };
    const handleShow = () => {
        console.log(kindergarten.kindergartens,"show")
        setKindergartenState(kindergarten.kindergartens.street !== undefined ? kindergarten.kindergartens : {
            districtId:'',
            id:'', "name": "",
            "number": '',
            "status": "",
            "street": ""})
        setShow(true);
    };

    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const kindergarten = useSelector(state => state.kindergarten)


    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(getKindergartenCurrent());
            handleClose();
        }
    }, [kindergarten.result])

    useEffect(() => {
        setKindergartens(kindergarten.kindergartens);
    }, [kindergarten.kindergartens]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getKindergartenCurrent());
        }
    }, [])

    const submitKindergarten = (e) => {
        e.preventDefault();
        console.log(kindergartenState,"Salom")
        if (kindergartenState.id !== '') {
            dispatch(editKindergarten(kindergartenState));
        } else {
            dispatch(addKindergarten(kindergartenState))
        }
    }
    const onClickDepartment = (data, number) => {
        if (number === 1) {
            setKindergartenState(data);
            handleShow();
        } else if (number === 2) {
            dispatch(deleteKindergarten(data));
        }
    }

    const onChanges = (param) => (e) => {
        setKindergartenState({...kindergartenState, [param]: e.target.value});
    }

    const getDistrictId = (data) => {
        setKindergartenState({...kindergartenState,districtId:data.id})
    }

    return (
        <div>
            <Button variant={kindergarten.kindergartens.street ? "outline-info" :"outline-success"} size={'sm'} onClick={handleShow}>{kindergarten.kindergartens.street ? "Bog'chani o'zgartirish" : "Bog'cha qo'shish"}</Button>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={submitKindergarten}>
                    <Modal.Header closeButton>
                        <Modal.Title>{kindergartenState?.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        {kindergartenState?.id ==='' ? <Address district={getDistrictId} view={true}/> : null}
                        <Form.Text>Nomi</Form.Text>
                        <Form.Control name='name' type={'text'} required value={kindergartenState?.name} onChange={onChanges("name")}
                                      placeholder="Nomi "/>
                        {/*<br/>*/}
                        {/*<Form.Text>Raqami</Form.Text>*/}
                        {/*<Form.Control name='number' type={'number'} required value={kindergartenState?.number} onChange={onChanges("number")}*/}
                        {/*              placeholder="Raqami "/>*/}
                        <br/>
                        <Form.Text>Manzil</Form.Text>
                        <Form.Control name='street' required type={'text'} value={kindergartenState?.street} onChange={onChanges("street")}
                                      placeholder="Manzili "/>
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
    );
}

export default Kindergarten;