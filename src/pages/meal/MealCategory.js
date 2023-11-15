import React from 'react';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMealCategory, deleteMealCategory, editMealCategory, getMealCategory } from "./MealCategoryReducer";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { GrAdd } from "react-icons/gr";
import mealCategory from "./MealCategory";
import NavbarHeader from "../more/NavbarHeader";


function MealCategory() {
    const [show, setShow] = useState(false);
    const [mealCategoryState, setMealCategoryState] = useState({ id: '', name: '' });
    const [mealCategories, setMealCategories] = useState([]);
    const handleClose = () => {
        setShow(false);
        setMealCategoryState({ id: '', name: '' });
    };
    const handleShow = () => {
        setShow(true)
    };


    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const mealCategory = useSelector(state => state.mealCategory)


    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(getMealCategory());
            handleClose();
        }
    }, [mealCategory.result])


    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getMealCategory());
        }
    }, [])

    useEffect(() => {
        setMealCategories(mealCategory.mealCategories);
    }, [mealCategory.mealCategories]);

    const submitMealCategory = (e) => {
        e.preventDefault();
        if (mealCategoryState.id !== '') {
            dispatch(editMealCategory(mealCategoryState));
        } else {
            dispatch(addMealCategory(mealCategoryState))
        }
    }
    const onClickDepartment = (data, number) => {
        if (number === 1) {
            setMealCategoryState(data);
            handleShow();
        } else if (number === 2) {
            dispatch(deleteMealCategory(data));
        }
    }


    const onChanges = (param) => (e) => {
        setMealCategoryState({ ...mealCategoryState, [param]: e.target.value });
    }

    return (
        <div>
            <NavbarHeader name={"Taomlar turi bo'limi"} handleShow={handleShow} buttonName={"Taom_turini_qo'shish"}/>
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
                        mealCategories?.map((item, index) =>
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
                <Form onSubmit={submitMealCategory}>
                    <Modal.Header closeButton>
                        <Modal.Title>{mealCategoryState.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control name='name' required value={mealCategoryState.name} onChange={onChanges("name")}
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

export default MealCategory;