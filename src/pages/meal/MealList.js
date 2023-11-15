import React, {useMemo} from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addMeal, deleteMeal, editMeal, getMeal} from "./MealReducer";
import {Button, Card, Col, Form, Modal, Row, Table} from "react-bootstrap";
import NavbarHeader from "../more/NavbarHeader";
import {getProduct} from "../product/ProductReducer";
import DropdownCustomChackList from "../more/DropdownCustomChackList";
import {baseUrl} from "../../Default";
import {map} from "react-bootstrap/ElementChildren";

function MealList() {
    const [show, setShow] = useState(false);
    const [number, setNumber] = useState(0);
    const [fileState, setFileState] = useState('');
    const [value, setValue] = useState("");
    const [mealState, setMealState] = useState({id: '', name: '', weight: '', productMealList: [], mealCategoryId: ''});
    const [meals, setMeals] = useState([]);
    const handleClose = () => {
        setShow(false);
        setMealState({id: '', name: '', productMealList: [], weight: '', comment: '', mealCategoryId: ''});
        setValue("");
    };
    const handleShow = () => {
        setShow(true)
    };

    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const meal = useSelector(state => state.meal)
    const mealCategory = useSelector(state => state.mealCategory)
    const products = useSelector(state => state.product.products)

    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(getMeal());
            handleClose();
        }
    }, [meal.result])

    useEffect(() => {
        setMeals(meal.meals);
    }, [meal.meals]);

    useEffect(() => {
        if (firstUpdate.current !== true) {
            firstUpdate.current = true;
            dispatch(getMeal());
            dispatch(getProduct());
        }
    }, [])

    const submitMeal = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("jsonString", JSON.stringify(mealState));
        formData.append("file", fileState);
        if (mealState.id !== '') {
            dispatch(editMeal(formData, mealState.id));
        } else {
            dispatch(addMeal(formData));
        }
    }
    const onClickDepartment = (data, number) => {
        if (number === 1) {
            setNumber(number);
            setMealState(data);
            handleShow();
        } else if (number === 2) {
            dispatch(deleteMeal(data));
        } else if (number === 3) {
            setMealState(data);
            setNumber(number);
            handleShow();
        } else if (number === 0) {
            setNumber(number);
            setMealState({id: '', name: '', productMealList: [], weight: '', comment: '', mealCategoryId: ''});
            handleShow();
        }
    }

    const onChanges = (param) => (e) => {
        if (param === "file") {
            setFileState(e.target.files[0]);
            setValue(e.target.value);
        } else {
            setMealState({...mealState, [param]: e.target.value});
        }
    }
    const getProducts = (list) => {
        setMealState({...mealState, productMealList: list});
    }
    const getForm = () => {
        return (
            <Form onSubmit={submitMeal}>
                <Modal.Header closeButton>
                    <Modal.Title>{mealState.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Taom nomi</Form.Label>
                    <Form.Control name='name' required value={mealState.name} onChange={onChanges("name")}
                                  placeholder="Nomi "/>
                    <br/>

                    <Form.Label>Taom vazni</Form.Label>
                    <Form.Control name='weight' required type={'number'} step={'0.01'}
                                  onWheel={(e) => e.target.blur()} value={mealState.weight}
                                  onChange={onChanges("weight")}
                                  placeholder="vazni "/>
                    <br/>
                    <Form.Label>Taom rasmi</Form.Label>
                    <Form.Control name='file' type={'file'}
                                  onChange={onChanges("file")}
                                  accept="image/png, image/jpeg"
                                  placeholder="Rasmi"
                                  value={value}

                    />
                    <br/>
                    <Form.Label>Ma'lumotlar</Form.Label>
                    <Form.Control as="textarea" name='comment' required type={'text'} value={mealState.comment}
                                  onChange={onChanges("comment")}
                                  placeholder="ma'lumotlar "/>
                    <br/>
                    <Form.Select name={"mealCategoryId"} onChange={onChanges("mealCategoryId")}>
                        <option value="12ed"> Taom turlari</option>
                        {
                            mealCategory.mealCategories?.map((item, index) =>
                                <option value={item.id}
                                        selected={mealState.mealCategoryId === item.id ? "selected" : false}
                                        key={index}>{item.name}</option>
                            )
                        }
                    </Form.Select>
                    <br/>
                    <DropdownCustomChackList editList={mealState.productMealList} list={products}
                                             name={"Mahsulotlar"} setData={getProducts} param={"name"}/>
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
        );
    }
    const getMealOne = () => {
        return (
            <Modal.Body>
                <img src={baseUrl() + mealState.attachmentId} width={'100%'}/>
                <Card>
                    <Card.Header>
                        { mealState.name} taomini tarkibi
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
                                mealState?.productMealList?.map((item,index)=>
                                    <tr>
                                        <td>{index+1}</td>
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
                        { mealState.name} taomini energetik quvvati
                    </Card.Header>
                    <Card.Body>
                        <Table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Uglevod</th>
                                <th>Kaloriya</th>
                                <th>Yog' miqdori</th>
                                <th>Oqsil</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>{mealState.carbohydrates}</td>
                                <td>{mealState.kcal}</td>
                                <td>{mealState.protein}</td>
                                <td>{mealState.oil}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header>
                        { mealState.name} taomini umumiy malumotlari
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
                            <tr><td>1</td><td>Tayyorlanish vazni</td> <td>{mealState.weight}</td></tr>
                            <tr><td>2</td><td>Taom turi</td><td>{mealState.mealCategoryName}</td></tr>
                            <tr><td colSpan={3}>
                                <strong>
                                    Qo'shimcha ma'lumotlar:
                                </strong>
                                <br/>
                                <br/>
                                {mealState.comment}</td></tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Modal.Body>
        )
    }

    return (
        <div>
            <NavbarHeader name={"Taomlar bo'limi"} handleShow={() => onClickDepartment(null, 0)}
                          buttonName={"Taom_qo'shish"}/>
            <br/>
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
                    meals?.map((item, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>
                                <Button variant='outline-info' size='sm' onClick={() => onClickDepartment(item, 1)}>
                                    O'zgartirish
                                </Button>
                            </td>
                            <td>
                                <Button variant='outline-info' size='sm' onClick={() => onClickDepartment(item, 3)}>
                                    Ko'rish
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
                {
                    number === 1 || number === 0 ? getForm() : null
                }
                {
                    number === 3 ? getMealOne() : null
                }
            </Modal>
        </div>
    );
}

export default MealList;
