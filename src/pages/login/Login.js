import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Container, Form, Nav, Row, Tab} from "react-bootstrap";
import './loginPage.css';
import logo from "../file/mtt-menu.jpg";
import {useDispatch, useSelector} from "react-redux";
import {loadingPage, logIn, resetPassword, signUp, tokenNull} from "./ReducerLogin";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import LoadingPage from "../LoadingPage";


function Login() {
    const [loader, setLoader] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const dispatch = useDispatch();
    const token = useSelector(state => state.login.token)
    const pushToUrl = useNavigate()
    const error = useSelector(state => state.login.error)
    const login = useSelector(state => state.login)
    const firstUpdate = useRef(false);
    const history = useNavigate();

    useEffect(() => {
        dispatch(loadingPage(false));
        if (token?.user_role !== undefined) {
            localStorage.setItem("role", token?.user_role);
            localStorage.setItem("Authorization", "Bearer " + token?.access_token);
            console.log("Authorization", token?.access_token);
            if (token?.user_role === "ROLE_ADMIN") {
                history("/sidebar/admin");
            } else if (token?.user_role === "ROLE_SUPER_ADMIN") {
                history("/sidebar/super-admin");
            } else if (token?.user_role === "ROLE_BOG`CHA_MUDIRASI"
                || token?.user_role === "ROLE_PROGRAMMER"
                || token?.user_role === "ROLE_TECHNOLOGIST"
            ) {
                history("/sidebar/user");
            }
            dispatch(tokenNull());
        }
    }, [token]);

    useEffect(() => {
        if (!firstUpdate.current) {

        } else {
            setLoader(false)
        }
    }, [login.checkTelError]);

    useEffect(() => {
        dispatch(loadingPage(false));
        if (!firstUpdate.current) {

        } else {
            if (login.checkTelResult) {
                pushToUrl("/sidebar/code/" + phoneNumber);
            }

        }
        setLoader(false);
    }, [login.checkTelResult]);

    useEffect(() => {
        if (!firstUpdate.current) {

        } else {
            // toast.error(error?.code);
            setLoader(false)
            dispatch(loadingPage(false));
        }
    }, [error]);


    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
        }
    }, []);

    const loginSubmit = (e) => {
        e.preventDefault();
        const qs = require('qs');
        const data = {username: e.target.username.value, password: e.target.password.value};
        setPhoneNumber(e.target.username.value);
        dispatch(logIn(qs.stringify(data)));
        dispatch(loadingPage(true));
    }
    const loginSubmit2 = (e) => {
        e.preventDefault();
        if (e.target.password.value === e.target.password2.value) {
            const data = {
                phoneNumber: e.target.username.value,
                password: e.target.password.value,
                fatherName: e.target.fatherName.value,
                surname: e.target.surname.value,
                name: e.target.name.value
            };
            dispatch(signUp(data));
            setPhoneNumber(e.target.username.value);
        } else {
            toast.error("Parollar mosligini tekshiring")
        }
        dispatch(loadingPage(true));
    }

    const loginSubmit3 = (e) => {
        e.preventDefault();
        if (e.target.password.value === e.target.password2.value) {
            const data = {phoneNumber: e.target.username.value, password: e.target.password.value};
            setPhoneNumber(e.target.username.value);
            dispatch(resetPassword(data));
        } else {
            toast.error("Parollar mosligini tekshiring");
            setLoader(true);
        }
    }

    return (
        <div style={{minHeight: '100vh', backgroundColor: 'white'}}>
            <Container fluid={true}>
                <Row>
                    <Col xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                        <Tab.Container defaultActiveKey="first">
                            <Row>
                                <Col sm={12}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first">
                                            <Row className={'loginPage justify-content-center'}>
                                                <Col xs={12} sm={12} lg={12} xxl={12} className={'inner text-center'}>
                                                    <img src={logo} alt="" width={300} style={{borderRadius: 10}}/>
                                                    <div className={'logoButtomText'}>Tizimga kirish</div>
                                                    <Row className={'justify-content-center'}>
                                                        <Col xs={10} sm={8} md={8} lg={6} xl={6}>
                                                            <Form id={'login'} onSubmit={loginSubmit}>
                                                                <Form.Control name={'username'} type={'text'}
                                                                              minLength="12"
                                                                              defaultValue={"998"}
                                                                              size={'sm'}
                                                                              className={'mt-3'}
                                                                              placeholder={'Telefon raqamingizni kiriting'}
                                                                              required/>
                                                                <Form.Control type={'password'} name={'password'}
                                                                              minLength="8" size={'sm'}
                                                                              className={'mt-3'}
                                                                              placeholder={'Parolni kiriting'}
                                                                              aria-required required/>
                                                            </Form>
                                                            <br/>
                                                            <Button variant={'primary'} size={'sm'} type={'submit'}
                                                                    form={'login'}
                                                                    style={{width: '50%', backgroundColor: '#52AAFB'}}>
                                        <span>
                                            KIRISH
                                        </span>
                                                            </Button>
                                                            <br/>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="second">
                                            <Row className={'loginPage justify-content-center'}>
                                                <Col xs={12} sm={12} lg={12} xxl={12} className={'inner text-center'}>
                                                    <img src={logo} alt="" height={300} width={300}/>
                                                    <div className={'logoButtomText'}>Ro'yxatdan o'tish</div>
                                                    <Row className={'justify-content-center'}>
                                                        <Col xs={10} sm={8} md={8} lg={6} xl={6}>
                                                            <Form id={'login2'} onSubmit={loginSubmit2}>
                                                                <Form.Text>Ismingiz</Form.Text>
                                                                <Form.Control name={'name'} type={'text'}
                                                                              size={'sm'}
                                                                              className={'mb-3'}
                                                                              placeholder={'Ismingizni kiriting'}
                                                                              required/>
                                                                <Form.Text>Sharifingiz</Form.Text>
                                                                <Form.Control name={'fatherName'} type={'text'}
                                                                              size={'sm'}
                                                                              className={'mb-3'}
                                                                              placeholder={'Sharifingizni kiriting'}
                                                                              required/>
                                                                <Form.Text>Familiyangiz</Form.Text>
                                                                <Form.Control name={'surname'} type={'text'}
                                                                              size={'sm'}
                                                                              className={'mb-3'}
                                                                              placeholder={'Familiyangizni kiriting'}
                                                                              required/>
                                                                <Form.Text>Telefon Raqamingiz</Form.Text>
                                                                <Form.Control name={'username'} type={'text'}
                                                                              minLength="12"
                                                                              maxLength={12}
                                                                              size={'sm'}
                                                                              className={'mb-3'}
                                                                              defaultValue={"998"}
                                                                              placeholder={'Telefon raqamingizni kiriting'}
                                                                              required/>
                                                                <Form.Text>Parol kiriting</Form.Text>
                                                                <Form.Control type={'password'} name={'password'}
                                                                              minLength="8" size={'sm'}
                                                                              className={'mb-3'}
                                                                              placeholder={'Parolni kiriting'}
                                                                              required/>
                                                                <Form.Text>Parolni takrorlang</Form.Text>
                                                                <Form.Control type={'password'} name={'password2'}
                                                                              minLength="8" size={'sm'}
                                                                              className={'mb-3'}
                                                                              placeholder={'Parolni takrorlang'}
                                                                              required/>
                                                            </Form>
                                                            <br/>
                                                            <Button variant={'primary'} size={'sm'} type={'submit'}
                                                                    form={'login2'}
                                                                    style={{width: '50%', backgroundColor: '#52AAFB'}}>
                                        <span>
                                            RO'YXATDAN O'TISH
                                        </span>
                                                            </Button>
                                                            <br/>

                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="third">
                                            <Row className={'loginPage justify-content-center'}>
                                                <Col xs={12} sm={12} lg={12} xxl={12} className={'inner text-center'}>
                                                    <img src={logo} alt="" height={300} width={300}/>
                                                    <div className={'logoButtomText'}>Parolni tiklash</div>
                                                    <Row className={'justify-content-center'}>
                                                        <Col xs={10} sm={8} md={8} lg={6} xl={6}>
                                                            <Form id={'login3'} onSubmit={loginSubmit3}>
                                                                <Form.Control name={'username'} type={'text'}
                                                                              minLength="12"
                                                                              defaultValue={"998"}
                                                                    // maxLength={12}
                                                                              size={'sm'}
                                                                              className={'mt-3'}
                                                                              placeholder={'Telefon raqamingizni kiriting'}
                                                                              required/>

                                                                <Form.Control type={'password'} name={'password'}
                                                                              minLength="8" size={'sm'}
                                                                              className={'mt-3'}
                                                                              placeholder={'Parolni kiriting'}
                                                                              required/>
                                                                <Form.Control type={'password'} name={'password2'}
                                                                              minLength="8" size={'sm'}
                                                                              className={'mt-3'}
                                                                              placeholder={'Parolni takrorlang'}
                                                                              required/>
                                                            </Form>
                                                            <br/>
                                                            <Button variant={'primary'} size={'sm'} type={'submit'}
                                                                    form={'login3'}
                                                                    style={{
                                                                        width: '50%',
                                                                        backgroundColor: '#52AAFB'
                                                                    }}>

                                        <span>
                                            TAYYOR
                                        </span>
                                                            </Button>

                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                                <Col sm={12}>
                                    <Nav className="justify-content-center">
                                        <Nav.Item>
                                            <Nav.Link eventKey="first">Tizimga kirish</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="second">Ro'yxatdan o'tish</Nav.Link>
                                        </Nav.Item>
                                    </Nav>

                                </Col>
                                <Col><Nav className="justify-content-center">
                                    <Nav.Item>
                                        <Nav.Link eventKey="third">Parolni tiklash</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                </Col>
                            </Row>
                        </Tab.Container>

                    </Col>
                </Row>
            </Container>
            <LoadingPage load={loader}/>
        </div>);
}

export default Login;
