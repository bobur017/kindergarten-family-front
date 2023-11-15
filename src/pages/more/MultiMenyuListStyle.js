import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import LoadingPage from "../LoadingPage";
import {useMediaQuery} from "react-responsive";
import {RiDeleteBin2Fill} from "react-icons/ri";
import {BsPencilSquare} from "react-icons/bs";
import ReactApexChart from 'react-apexcharts';
import {colorTextStr} from "./Functions";
import {useNavigate} from "react-router-dom";

function Product({multiMenuList,selectMultiMenu}) {
    const pie = {
        series: [14, 85],
        options: {
            colors: ['#BABDC6', '#00A859'],
            labels: ['Bajarilmadi %', 'Bajarildi %'],
            chart: {
                type: 'donut',
            },
            legend: {
                show: false
            },
            dataLabels: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            total: {
                                showAlways: true,
                                show: true,
                                label: "Sanpin"
                            },
                        }
                    }
                }
            },

        },
    }
    const defaultData = {
        "date": "Sana tanlanmagan",
        "id": '',
        "price": '',
        "productId": '',
        "weight": '',
        productName: ''
    }
    const [show, setShow] = useState(false);
    const [params, setParams] = useState({year: '', month: "", type: "pdf"});
    const [load, setLoad] = useState(false);
    const [receivedState, setReceivedState] = useState(defaultData);
    const [receiveds, setReceiveds] = useState([]);
    const handleClose = () => {
        setShow(false);
        setReceivedState(defaultData);
    };
    const handleShow = (num, data) => {
        if (num === 4) {
            history("/sidebar/multi-menu-product/" + data?.id)
        }
        setShow(true)
    };
    const history = useNavigate();
    const isDesktop = useMediaQuery({query: '(min-width: 447px)'});
    const isDesktop2 = useMediaQuery({query: '(min-width: 510px)'});
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const received = useSelector(state => state.received);

    useEffect(() => {
        if (firstUpdate.current) {
            setLoad(false);
            handleClose();
        }
    }, [received.result])

    useEffect(() => {
        setReceiveds(received.receiveds);
    }, [received.receiveds]);

    useEffect(() => {

    }, [isDesktop]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
        }
    }, [])

    const pushUrl = (data) => {
        history("/sidebar/user/multi-menu-one/" + data?.id);
    }
    const onChanges = (param) => (e) => {
        setReceivedState({...receivedState, [param]: e.target.value});
    }
    const selectMenu = (data) => {
        selectMultiMenu(data);
    }


    return (
        <div>

            <div className={"d-flex justify-content-center p-2 mb-5"}>
                <div>
                    {multiMenuList?.map((item, index) =>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} key={index} className={"shadow p-2 mt-2"} style={{backgroundColor:'white'}}>
                            <div className={"d-flex justify-content-between p-2"}>
                                <div className={"d-flex "}>
                                    <Button variant={"outline-danger"} size={"sm"} className={"m-1"}>
                                        Yuklash
                                    </Button>
                                    <Button variant={"outline-info d-flex"}
                                            size={"sm"}
                                            className={"m-1"}
                                            onClick={() => handleShow(4, item)}>
                                        Mahsulotlari
                                    </Button>
                                </div>
                                {item.edit ? <div className={"d-flex justify-content-end w-25"}>
                                    <div style={{cursor: 'pointer'}} className={"mx-3"}
                                    ><RiDeleteBin2Fill color={'#E9573F'} size={20}/></div>
                                    <div style={{cursor: 'pointer'}}><BsPencilSquare
                                        color={'orange'} size={20}/></div>
                                </div> : null}
                                {item?.select ? <Button variant={"success"} className={"m-1"} disabled
                                                        size={"sm"}>Tanlangan</Button> :
                                    <Button size={"sm"} className={"m-1"} variant={"outline-dark"}
                                            onClick={() => selectMenu(item)}>Tanlash</Button>}
                            </div>
                            <div className={item?.select ? "px-2 my-card" : "px-2"}>
                                <div className={'d-flex justify-content-between align-items-center'}>
                                    <Container fluid={true}>
                                        <Row>
                                            <Col>
                                                <div className={`my-Hover text-center`} onClick={() => pushUrl(item)}>
                                                    <div style={{fontSize: 25}}
                                                         className={'fw-semibold'}>{item.name}</div>
                                                    <div
                                                        style={{fontSize: 20}}>{item.daily} kun uchun mo‘ljallangan
                                                    </div>
                                                    <br/>
                                                   </div>
                                            </Col>
                                            <Col className={" d-flex justify-content-between align-items-center"}>
                                                <div className={'w-100 d-flex justify-content-between align-items-center'}>
                                                    <ReactApexChart options={{
                                                        ...pie.options,
                                                        colors: ['#BABDC6', colorTextStr(item.sanPinPercentage)],
                                                        plotOptions: {
                                                            pie: {
                                                                donut: {
                                                                    labels: {
                                                                        show: true,
                                                                        total: {
                                                                            showAlways: true,
                                                                            show: true,
                                                                            fontSize: isDesktop ? '10px' : '6',
                                                                            label: "Sanpin \n o'rtacha",
                                                                            formatter: function (w) {
                                                                                return item.sanPinPercentage;
                                                                            }
                                                                        },
                                                                        value: {
                                                                            fontSize: 10,
                                                                            offsetY: -4
                                                                        },
                                                                        name: {
                                                                            fontSize: 10,
                                                                            offsetY: -4
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        },
                                                    }}
                                                                    series={[item.sanPinPercentage > 100 ? 0 : 100 - item.sanPinPercentage, item.sanPinPercentage]}
                                                                    type="donut" width={isDesktop2 ? 150 :isDesktop ? 130 : 80}
                                                                    height={isDesktop2 ? 150 :isDesktop ? 130 : 100}/>
                                                    <ReactApexChart options={{
                                                        ...pie.options,
                                                        colors: ['#BABDC6', colorTextStr(item.sanPinPercentageMax)],
                                                        plotOptions: {
                                                            pie: {
                                                                donut: {
                                                                    labels: {
                                                                        show: true,
                                                                        total: {
                                                                            showAlways: true,
                                                                            show: true,
                                                                            fontSize: isDesktop ? '10px' : '6',
                                                                            label: "Sanpin max",
                                                                            formatter: function (w) {
                                                                                return item.sanPinPercentageMax;
                                                                            }
                                                                        },
                                                                        value: {
                                                                            fontSize: 10,
                                                                            offsetY: -4
                                                                        },
                                                                        name: {
                                                                            fontSize: 10,
                                                                            offsetY: -4
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }}
                                                                    series={[item.sanPinPercentageMax > 100 ? 0 : 100 - item.sanPinPercentageMax, item.sanPinPercentageMax]}
                                                                    type="donut" width={isDesktop2 ? 150 :isDesktop ? 130 : 80}
                                                                    height={isDesktop2 ? 150 :isDesktop ? 130 : 100}/>

                                                    <ReactApexChart options={{
                                                        ...pie.options,
                                                        colors: ['#BABDC6', colorTextStr(item.sanPinPercentageMin)],
                                                        plotOptions: {
                                                            pie: {
                                                                donut: {
                                                                    labels: {
                                                                        show: true,
                                                                        total: {
                                                                            showAlways: true,
                                                                            show: true,
                                                                            fontSize: isDesktop ? '10px' : '6',
                                                                            label: "Sanpin min",
                                                                            formatter: function (w) {
                                                                                return item.sanPinPercentageMin;
                                                                            }
                                                                        },
                                                                        value: {
                                                                            fontSize: 10,
                                                                            offsetY: -4
                                                                        },
                                                                        name: {
                                                                            fontSize: 10,
                                                                            offsetY: -4
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        },
                                                    }}
                                                                    series={[item.sanPinPercentageMin > 100 ? 0 : 100 - item.sanPinPercentageMin, item.sanPinPercentageMin]}
                                                                    type="donut" width={isDesktop2 ? 150 :isDesktop ? 130 : 80}
                                                                    height={isDesktop2 ? 150 :isDesktop ? 130 : 100}/>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                            </div>
                        </Col>
                    )}
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>

                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Text>{receivedState?.productName}</Form.Text>
                        <Form.Control name='product' disabled
                                      value={receivedState?.productName}
                                      onChange={onChanges("name")}
                                      placeholder="Nomi "/>

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

export default Product;
