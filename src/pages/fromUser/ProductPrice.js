import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    addProductPrice,
    autoProductPrice,
    editProductPrice,
    getProduct,
    getProductPrice
} from "../product/ProductReducer";
import {Button, Form, FormGroup, FormLabel, InputGroup, Modal} from "react-bootstrap";
import DropdownCustom from "../more/DropdownCustom";
import FromPageSizeBottom from "../fromPage/FromPageSizeBottom";

function ProductPrice(props) {
    const dto = {
        "month": '',
        "price": '',
        "productId": '',
        "year": ''
    };
    const [show, setShow] = useState(false);
    const [currentNum, setCurrentNum] = useState(0);
    const handleClose = () => setShow(false);
    const handleShow = (data, num) => {
        if (data) {
            setProductState(data);
        }
        if (num){
            setCurrentNum(num);
        }else {
            setCurrentNum(0);
        }
        setShow(true)
    };
    const [productState, setProductState] = useState(dto);
    const [params, setParams] = useState({year: '', month: '', pageNumber: '', pageSize: ''});
    const dispatch = useDispatch();
    const history = useNavigate();
    const product = useSelector(state => state.product)
    const firstUpdate = useRef(false);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            let date = new Date();
            let month = date.getUTCMonth() + 1; //months from 1-12
            let year = date.getFullYear();
            setParams({...params, year, month});
            dispatch(getProduct());
            dispatch(getProductPrice({year, month}));
        } else {
            dispatch(getProductPrice(params));
        }
    }, [product.result]);

    const getProdFun = (data) => {
        setProductState({...productState, productId: data.id, productName: data.name});
    }
    const submitProductPrice = (e) => {
        e.preventDefault();
        if (productState.id) {
            dispatch(editProductPrice({
                year: params.year,
                month: params.month,
                productId: productState.productId,
                price: productState.price,
                id: productState.id
            }));
        } else {
            dispatch(addProductPrice({
                year: params.year,
                month: params.month,
                productId: productState.productId,
                price: productState.price
            }));
        }
        setProductState(dto);
        handleClose();
    }


    const getProductData = (e) => {
        e.preventDefault();
        // dispatch(getProductPrice(params));
    }
    const changeProductPrice = (e) => {
        let year;
        let month;
        if (e.target.name === "year") {
            year = e.target.value;
            month = params.month;
        } else {
            year = params.year;
            month = e.target.value;
        }
        setParams({...params, [e.target.name]: e.target.value})
        if (year && month) {
            dispatch(getProductPrice({year, month}));
        }
    }
    const changePage3 = (pageNumber) => {
        dispatch(getProductPrice({...params, pageNumber}));
        setParams({...params, pageNumber});
    }
    const renderAddProduct = () => {
        return (
            <Form onSubmit={submitProductPrice}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <DropdownCustom list={product?.products} name={"name"}
                                        dropDownName={productState?.productName} setData={getProdFun}/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup>
                        <FormLabel className={"mx-2"}>Narxi</FormLabel>
                        <Form.Control name={"price"} value={productState?.price} required type={"number"}
                                      onWheel={e => e.target.blur()} onChange={e => setProductState({
                            ...productState,
                            [e.target.name]: e.target.value
                        })}/>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type={"submit"}>
                        Tayyor
                    </Button>
                </Modal.Footer>
            </Form>
        )
    }
    const autoPrice = () => {
        dispatch(autoProductPrice({year: params.year, month: params.month}));
        handleClose();
    }
    const infoAutoAddProduct = () => {
        return (
            <div>
                <Modal.Body>
                    <span style={{fontSize:18,color:'#c09b01'}}>Tizimga umumiy o'rtacha kiritilgan narxlar asosida mahsulot narxlarizni shakllantirasizmi </span>
                    <br/>
                    <div className={"d-flex justify-content-around mt-3"}>
                        <Button variant="danger" size={"sm"} onClick={handleClose}>
                            YO'Q
                        </Button>
                        <Button size={"sm"} onClick={autoPrice}>
                            HA
                        </Button>
                    </div>
                </Modal.Body>
            </div>
        )
    }
    return (
        <div className={"p-2"}>
            <div className={"figma-card"}>
                <div className={"d-flex justify-content-center"}>
                    <InputGroup>
                        {/*<FormLabel className={"mx-3 fw-bolder"}>Yil</FormLabel>*/}
                        <Form.Select required name={"year"} value={params.year}
                                     onChange={changeProductPrice}>
                            <option value="">Yil</option>
                            <option value={2022}>2022</option>
                            <option value={2023}>2023</option>
                            <option value={2024}>2024</option>
                            <option value={2025}>2025</option>
                        </Form.Select>
                    </InputGroup>
                    <InputGroup className={"mx-2"}>
                        {/*<FormLabel className={"mx-3 fw-bolder"}>Oy</FormLabel>*/}
                        <Form.Select required name={"month"} value={params.month}
                                     onChange={changeProductPrice}>
                            <option value="">Oy</option>
                            <option value={1}>Yanvar</option>
                            <option value={2}>Fevral</option>
                            <option value={3}>Mart</option>
                            <option value={4}>Aprel</option>
                            <option value={5}>May</option>
                            <option value={6}>Iyun</option>
                            <option value={7}>Iyul</option>
                            <option value={8}>Avgust</option>
                            <option value={9}>Sentabr</option>
                            <option value={10}>Oktabr</option>
                            <option value={11}>Noyabr</option>
                            <option value={12}>Dekabr</option>
                        </Form.Select>
                    </InputGroup>
                    {/*<Button className={"mx-3"} variant={"outline-success"} size={"sm"} type={"submit"}>Tayyor</Button>*/}
                </div>
            </div>
            <div className={"miniTable1 bg-white mt-3 figma-card"}>
                <div className={"d-flex justify-content-between"}>
                    <Button variant="primary" size={"sm"} onClick={handleShow} className={"my-2 mx-1"}>
                        Mahsulot qo'shish
                    </Button>
                    <Button variant="primary" size={"sm"}
                            onClick={() => handleShow(null, 1)}
                            className={"my-2"}>
                        Narxlarni avto biriktirish
                    </Button>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Nomi</th>
                        <th>Narxi</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        product.productPrice?.list?.map((item, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td onClick={() => handleShow(item)} style={{cursor: "pointer"}}>{item.productName}</td>
                                <td>{item.price}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
            <br/>
            <FromPageSizeBottom currentPage={product.productPrice?.getPageNumber}
                                pageSize={product.productPrice?.getPageSize} changesPage={changePage3}
                                allPageSize={product.productPrice?.allPageSize}/>
            <Modal show={show} onHide={handleClose}>
                {currentNum === 0 ? renderAddProduct() : null}
                {currentNum === 1 ? infoAutoAddProduct() : null}
            </Modal>
        </div>
    );
}

export default ProductPrice;
