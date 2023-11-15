import React from 'react';
import NavbarHeader from "../more/NavbarHeader";
import {useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addProduct, deleteProduct, editProduct, getMeasurement, getProduct,} from "./ProductReducer";
import {Button, Form, Modal, Table} from "react-bootstrap";

function ProductList() {
    const [show, setShow] = useState(false);
    const [productState, setProductState] = useState({
        "carbohydrates": '',
        "id": '',
        "kcal": '',
        "measurementType": "",
        "name": "",
        "oil": '',
        "productCategoryId": '',
        "protein": '',
        "sanpinCategoryId": ''});
    const [products, setProducts] = useState([]);
    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const product = useSelector(state => state.product)
    const measurement = useSelector(state => state.product.measurement)
    const sanpinCategory = useSelector(state => state.sanpinCategory.sanpinCategory)

    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(getProduct());
            handleClose();
        }
    }, [product.result]);

    useMemo(() => {
        setProducts(product.products);
    }, [product.products]);


    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getProduct());
            dispatch(getMeasurement());
        }
    }, []);


    const submitMtt = (e) => {
        e.preventDefault();
        if (productState.id !== '') {
            dispatch(editProduct(productState));
        } else {
            dispatch(addProduct(productState))
        }
    }
    const setNullDataToState = () => {
        setProductState({
            "carbohydrates": '',
            "id": '',
            "kcal": '',
            "measurementType": "",
            "name": "",
            "oil": '',
            "productCategoryId": '',
            "protein": '',
            "sanpinCategoryId": ''});
        handleShow();
    }
    const onClickDepartment = (data, number) => {
        if (number === 1) {
            setProductState(data);
            handleShow();
        } else if (number === 2) {
            dispatch(deleteProduct(data));
        }
    }


    const onChanges = (e) => {
        console.log(e.target.value,e.target.name)
        setProductState({...productState, [e.target.name]: e.target.value});
        console.log(productState,"uuuuuu")
    }

    return (
        <div>
            <NavbarHeader name={"Mahsulot  bo'limi"} buttonName={"Mahsulot qo'shish"}
                          handleShow={setNullDataToState}/>
            <br/>
            <Table bordered size='sm' className='text-center'>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Nomi</th>
                    <th>Uglevod</th>
                    <th>Oqsil</th>
                    <th>Kc-kall</th>
                    <th>Yog'</th>
                    <th>O'lchov <br/> birligi</th>
                    <th>Mahsulot <br/> turi</th>
                    <th>Sanpin</th>
                    <th>O'zgartirish</th>
                    <th>O'chirish</th>
                </tr>
                </thead>
                <tbody>
                {
                    products?.map((item, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{ item.name}</td>
                            <td>{ item.carbohydrates}</td>
                            <td>{ item.protein}</td>
                            <td>{ item.kcal}</td>
                            <td>{ item.oil}</td>
                            <td>{ item.measurementType}</td>
                            <td>{ item.productCategoryName}</td>
                            <td>{ item.sanpinCategoryName}</td>
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
                        <Modal.Title>{productState.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label>Mahsulot nomi</Form.Label>
                        <Form.Control name='name' required value={productState.name} onChange={onChanges}
                                      placeholder="Mahsulot nomi "/>
                        <br/>
                        <Form.Label>Uglevod</Form.Label>
                        <Form.Control name='carbohydrates' type={'number'} onWheel={(e) => e.target.blur()} required
                                      value={productState.carbohydrates} onChange={onChanges}
                                      step={'0.01'}
                                      placeholder="Uglevod "/>
                        <br/>
                        <Form.Label>Kilo kalloriya</Form.Label>
                        <Form.Control name='kcal' type={'number'} onWheel={(e) => e.target.blur()} required
                                      value={productState.kcal} onChange={onChanges}
                                      step={'0.01'}
                                      placeholder="Kilo kalloriya"/>
                        <br/>
                        <Form.Label>Oqsil</Form.Label>
                        <Form.Control name='protein' type={'number'} onWheel={(e) => e.target.blur()} required
                                      value={productState.protein} onChange={onChanges}
                                      step={'0.01'}
                                      placeholder="Oqsil"/>
                        <br/>
                        <Form.Label>Yog'</Form.Label>
                        <Form.Control name='oil' type={'number'} onWheel={(e) => e.target.blur()} required
                                      value={productState.oil} onChange={onChanges}
                                      step={'0.01'}
                                      placeholder="Yog'"/>
                        <br/>
                        <Form.Label>Mahsulot turi</Form.Label>
                        <Form.Select name={"productCategoryId"} value={productState.productCategoryId} onChange={onChanges}>
                            <option value="">Mahsulot turini tanlang</option>
                            {
                                product?.productsCategories?.map((item, index) =>
                                    <option key={index} selected={productState.productCategoryId === item.id}
                                            value={item.id}>{item.name}</option>
                                )
                            }
                        </Form.Select>
                        <br/>
                        <Form.Label>O'lchov birligi</Form.Label>
                        <Form.Select name={"measurementType"} value={productState.measurementType} onChange={onChanges}>
                            <option value="">O'lchov birligi</option>
                            {
                                measurement?.map((item, index) =>
                                    <option key={index} selected={productState.measurementType === item}
                                            value={item}>{item}</option>
                                )
                            }
                        </Form.Select>
                        <Form.Label>Sanpin turi</Form.Label>
                        <br/>
                        <Form.Select name={"sanpinCategoryId"} value={productState.sanpinCategoryId} onChange={onChanges}>
                            <option value="">Sanpinni tanlang</option>
                            {
                                sanpinCategory?.map((item, index) =>
                                    <option key={index} selected={productState.sanpinCategoryId === item.id}
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

export default ProductList;