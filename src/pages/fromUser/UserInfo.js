import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addUser, deleteUser, editUser, getUserCurrent, getUsers} from "./reducers/UserInfoReducer";
import Kindergarten from "../kindergarten/Kindergarten";
import {
    Button,
    Card,
    Container,
    Form,
    Modal,
    Row,
    Table,
    useAccordionButton
} from "react-bootstrap";
import {ImExit} from "react-icons/im";
import {AiOutlineCaretDown} from "react-icons/ai";
import CustomTabs from "../more/CustomTabs";
import {getRoleStorage, pushToLogin} from "../more/Functions";

function UserInfo() {
    const kinderDefault = {
        districtId: '',
        id: '', "name": "",
        "number": '',
        "status": "",
        "street": ""
    };
    const [currentTab, setCurrentTab] = useState(0);
    const [show, setShow] = useState(false);
    const [userState, setUserState] = useState({id: '', name: ''});
    const [kindergartenState, setKindergartenState] = useState(kinderDefault);
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        setShow(true)
    };


    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const userR = useSelector(state => state.user)
    const kindergarten = useSelector(state => state.kindergarten.kindergartens)


    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(getUserCurrent());
            handleClose();
        }
    }, [userR.result])

    useEffect(() => {
        setUserState(userR.user);
    }, [userR.user]);

    useEffect(() => {
        setKindergartenState(kindergarten);
    }, [kindergarten]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getUserCurrent());
        }
    }, [])

    const submitUser = (e) => {
        e.preventDefault();
        if (userState.id !== '') {
            dispatch(editUser(userState));
        } else {
            dispatch(addUser(userState))
        }
    }

    const onChanges = (param) => (e) => {
        setUserState({...userState, [param]: e.target.value});
    }
    const getNavbarList = () => {
      let list = [];
      if (getRoleStorage() === "ROLE_BOG`CHA_MUDIRASI"){
         list = [{name: "Foydalanuvchi"}, {name: "Bog'cha"}];
      }else {
         list = [{name: "Foydalanuvchi"}];
      }
      return list;
    }
    return (
        <div>
            <CustomTabs list={getNavbarList()} currentNum={setCurrentTab}/>
            {currentTab === 0 ? <Container fluid>
                <Row>
                    <Card>
                        <Card.Header className={'d-flex justify-content-between'}>
                            <div>
                                <strong> Foydalanuvchi: </strong> {userState?.name} <AiOutlineCaretDown
                                size={25}/>
                            </div>
                            <Button variant={'outline-info'} size={'sm'} onClick={handleShow}>
                                O'zgartirish
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Table>
                                <tbody>
                                <tr>
                                    <td>Ismi</td>
                                    <td>{userState.name}</td>
                                </tr>
                                <tr>
                                    <td>Otasining ismi</td>
                                    <td>{userState?.fatherName}</td>
                                </tr>
                                <tr>
                                    <td>Familya</td>
                                    <td>{userState?.surname}</td>
                                </tr>
                                <tr>
                                    <td>Shartnoma raqami</td>
                                    <td>{userState?.contractNumber}</td>
                                </tr>
                                <tr>
                                    <td>Hisob miqdori</td>
                                    <td>{userState?.balance}</td>
                                </tr>
                                <tr>
                                    <td>Tel raqami</td>
                                    <td>{userState?.phoneNumber}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Row>
            </Container> : null}
            {currentTab === 1 ? <Card>
                <Card.Header className={'d-flex justify-content-between'}>
                    <div>
                        <strong>

                            Bo'gcha
                            :
                        </strong>
                        {kindergartenState?.name}
                    </div>
                    <Kindergarten/>
                </Card.Header>
                <Card.Body>
                    <Table>
                        <tbody>
                        <tr>
                            <td>Nomi</td>
                            <td> {kindergartenState.name}</td>
                        </tr>
                        <tr>
                            <td>Holati</td>
                            <td>{kindergartenState?.status}</td>
                        </tr>
                        <tr>
                            <td>Manzil</td>
                            <td>{kindergartenState?.street}</td>
                        </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card> : null}

            <div className={"w-100 d-flex justify-content-center mt-2"}>
                    <Button variant={'danger'} style={{width: 200}} onClick={()=>pushToLogin()}>
                        Tizimdan chiqish <ImExit/>
                    </Button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={submitUser}>
                    <Modal.Header closeButton>
                        <Modal.Title>{userState?.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Text>Ismi</Form.Text>
                        <Form.Control name='name' type={'text'} required value={userState?.name}
                                      onChange={onChanges("name")}
                                      placeholder="Nomi "/>
                        <br/>
                        <Form.Text>Sharifi</Form.Text>
                        <Form.Control name='fatherName' required type={'text'} value={userState?.fatherName}
                                      onChange={onChanges("fatherName")}
                                      placeholder="Sharifi"/>
                        <br/>
                        <Form.Text>Familyasi</Form.Text>
                        <Form.Control name='surname' required type={'text'} value={userState?.fatherName}
                                      onChange={onChanges("surname")}
                                      placeholder="Familyasi"/>
                        <br/>
                        <Form.Text>Tel raqami</Form.Text>
                        <Form.Control name='phoneNumber' required type={'text'} disabled value={userState?.phoneNumber}
                                      onChange={onChanges("phoneNumber")}
                                      placeholder="Tel raqami "/>
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

export default UserInfo;
