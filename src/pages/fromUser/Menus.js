import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addUserMenu, deleteUserMenu, editUserMenu, getUserMenu, getUserMenus} from "./reducers/UserMenuReducer";
import {Button, Card, Col, Container, Form, Modal, Offcanvas, Row, Tab, Table, Tabs} from "react-bootstrap";
import {getChildrenNumbers} from "./reducers/ChildrenNumberReducer";
import CheckedCalendar from "./CheckedCalendar";
import NavbarHeaderUser from "../more/NavbarHeaderUser";
import {toast} from "react-toastify";
import {Document, Page} from "react-pdf/dist/esm/entry.webpack";
import {getFile} from "../FilesReducer";
import SimpleCalendar from "../more/SimpleCalendar";
import {useNavigate} from "react-router-dom";

function Menus() {
    const [showCanvas, setShowCanvas] = useState(false);
    const handleCloseCanvas = () => setShowCanvas(false);
    const handleShowCanvas = () => setShowCanvas(true);
    const [show, setShow] = useState(false);
    const [userMenuState, setUserMenuState] = useState({dateList: [], menuId: '', menu: {}});
    const [userMenus, setUserMenus] = useState([]);
    const handleClose = () => {
        setShow(false);
        setUserMenuState({dateList: [], menuId: '', menu: {}});
    };
    const handleShow = () => {
        setShow(true)
    };
    const dispatch = useDispatch();
    const pushUrl = useNavigate();
    const firstUpdate = useRef(false);
    const userMenu = useSelector(state => state.userMenu)
    const file = useSelector(state => state.file.file)


    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(getUserMenus());
            dispatch(getChildrenNumbers())
            handleClose();
        }
    }, [userMenu.result])

    useEffect(() => {
        setUserMenus(userMenu.userMenus);
    }, [userMenu.userMenus]);

    useEffect(() => {
        console.log(file, "file")
    }, [file]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getUserMenus());
        }
    }, [])

    const submitUserMenu = () => {
        // e.preventDefault();
        let list = userMenuState.dateList.filter(item => item.checked === true).map(item => item.data)
        if (userMenuState.menu.daily === list.length) {
            if (userMenuState.menuId !== '') {
                dispatch(addUserMenu({...userMenuState, dateList: list}));
                console.log({...userMenuState, dateList: list}, "add")
            } else {
                toast.error("Menu tanlamadingiz!");
            }
        } else {
            toast.error("Tanlagan kunlaringiz menu kuniga muvoffiq bo'lsin!");
        }
    }
    const onClickDepartment = (data, number) => {
        if (number === 1) {
            setUserMenuState(data);
            handleShow();
        } else if (number === 2) {
            dispatch(deleteUserMenu(data));
        }
    }


    const onChanges = (param) => (e) => {
        setUserMenuState({...userMenuState, [param]: e.target.value});
    }


    const getItemCalendar = (data) => {
        setUserMenuState({...userMenuState, dateList: data.dayList})
    }


    const getItemMenu = (data) => {
        setUserMenuState({...userMenuState, menu: data, menuId: data.id});
        handleCloseCanvas();
    }
    const menuPage = () => {
        console.log(userMenuState)
        if(userMenuState.menu?.id){
        pushUrl("/multi-menu/"+userMenuState.menu.id)
        }else {
            toast.error("Menu tanlanmagan!")
        }
    }


    return (
        <div>
            <br/>
            <Tabs
                defaultActiveKey="home"
                className="mb-3"
                fill
            >
                <Tab eventKey="home" title="Menu biriktirish">
                    <Container>
                        <Row className={'g-0 text-center'}>
                            <Col xs={12} sm={12} md={12} xl={12} lg={12}>
                                <Table style={{backgroundColor: 'white'}} bordered>
                                    <tbody>
                                    <tr>
                                        <td><strong>Menu nomi: </strong></td>
                                        <td><strong>{userMenuState.menu.name ? userMenuState.menu.name : <span style={{color:'red'}}>Hali tanlanmagan</span>}</strong></td>
                                        <td>
                                            <Button variant="info" size={'sm'}  style={{width:'100%',height:50}} onClick={menuPage}>
                                                Menuni ko'rish
                                            </Button>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>Menu kuni: </strong></td>
                                        <td><strong>{userMenuState.menu.daily}</strong></td>
                                        <div>
                                            <Button variant="success" size={'sm'} style={{width:'100%',height:50}} onClick={handleShowCanvas}>
                                                Menuni tanlsh
                                            </Button>
                                        </div>
                                    </tr>
                                    </tbody>
                                </Table>
                                <Row className={'g-0 justify-content-lg-end justify-content-md-center justify-content-sm-center justify-content-xl-end'}>
                                    <Col xs={12} lg={4} xl={3} md={6} sm={6}>
                                        <Button variant={'outline-success'} style={{width:'100%'}} onClick={submitUserMenu}>Menuni biriktirish</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                    <CheckedCalendar getDayItem={getItemCalendar}/>
                </Tab>
                <Tab eventKey="profile" title="Menularn ko'rish">
                    <SimpleCalendar/>
                </Tab>
            </Tabs>

            <br/>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={submitUserMenu}>
                    <Modal.Header closeButton>
                        <Modal.Title>{userMenuState.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control name='name' required value={userMenuState.name} onChange={onChanges("name")}
                                      placeholder="Nomi "/>
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

            <Offcanvas placement={'end'} show={showCanvas} onHide={handleCloseCanvas}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Tanlash uchun menular ro'yxati</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {
                        userMenus.map((item, index) =>
                            <div key={index}>
                                <Card className={"my-hover"} onClick={() => getItemMenu(item)}>
                                    <Card.Header>
                                        <Table style={{backgroundColor: 'white'}}>
                                            <tbody>
                                            <tr>
                                                <td><strong>{item.name}</strong></td>
                                            </tr>
                                            <tr>
                                                <td><strong>{item.daily}</strong> kunlik menu</td>
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </Card.Header>
                                </Card>
                            </div>
                        )
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default Menus;
