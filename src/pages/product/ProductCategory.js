import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addProductCategory, deleteProductCategory, editProductCategory, getProductCategory} from "../product/ProductReducer";
import {Button, Col, Form, Modal, Row, Table} from "react-bootstrap";
import NavbarHeader from "../more/NavbarHeader";

function ProductCategory() {
    const [show, setShow] = useState(false);
    const [productCategoryState, setProductCategoryState] = useState({ id: '', name: '' });
    const [productCategories, setProductCategories] = useState([]);
    const handleClose = () => {
        setShow(false);
        setProductCategoryState({ id: '', name: '' });
    };
    const handleShow = (num) => {
        if(num===1){
            setProductCategoryState({ id: '', name: '' });
        }
        setShow(true)
    };


    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const productCategory = useSelector(state => state.product)

    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(getProductCategory());
            handleClose();
        }
    }, [productCategory.result]);

    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(getProductCategory());
        }
    }, [productCategory.delete]);

    useEffect(() => {
        setProductCategories(productCategory.productsCategories);
    }, [productCategory.productsCategories]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getProductCategory());
        }
    }, [])

    const submitProductCategory = (e) => {
        e.preventDefault();
        if (productCategoryState.id !== '') {
            dispatch(editProductCategory(productCategoryState));
        } else {
            dispatch(addProductCategory(productCategoryState));
        }
    }
    const onClickProductCategory = (data, number) => {
        if (number === 1) {
            setProductCategoryState(data);
            handleShow();
        } else if (number === 2) {
            dispatch(deleteProductCategory(data));
        }
    }


    const onChanges = (param) => (e) => {
        setProductCategoryState({ ...productCategoryState, [param]: e.target.value });
    }

    return (
        <div>
           <NavbarHeader name={"Mahsulot turlari bo'limi"} handleShow={()=>handleShow(1)} buttonName={"Mahsulot_turini qo'shish"}/>
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
                    productCategories?.map((item, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>
                                <Button variant='outline-info' size='sm' onClick={() => onClickProductCategory(item, 1)}>
                                    O'zgartirish
                                </Button>
                            </td>
                            <td>
                                <Button variant='outline-danger' size='sm' onClick={() => onClickProductCategory(item, 2)}>
                                    O'chirish
                                </Button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={submitProductCategory}>
                    <Modal.Header closeButton>
                        <Modal.Title>{productCategoryState.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control name='name' required value={productCategoryState.name} onChange={onChanges("name")}
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

export default ProductCategory;