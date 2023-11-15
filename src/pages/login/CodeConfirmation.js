import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import './loginPage.css'
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkCode, loadingPage, resetCode} from "./ReducerLogin";
import {GrPowerReset} from "react-icons/gr";
import {toast} from "react-toastify";
import {pushToLogin} from "../more/Functions";

function CodeConfirmation() {
    const [myTime, setMyTime] = useState(200);
    const [tel, setTel] = useState(useParams("tel"));
    const login = useSelector(state => state.login);
    const firstUpdate = useRef(false);
    const dispatch = useDispatch();
    const pushToUrl = useNavigate()

    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(loadingPage(false));
            toast.success("Muvaffaqiyatli");
            setTimeout(() => {
                pushToLogin();
                // pushToUrl("/");
            }, 300);
        }
    }, [login.checkCodeResult])

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
        }else {
            dispatch(loadingPage(false));
        }
    }, [login])

    const time = () => {
        if (
            myTime > 0
        ) {
            setMyTime(myTime - 1);
        }
    }
    const times = setTimeout(time, 1000);

    const submitCode = (e) => {
        e.preventDefault();
        dispatch(checkCode({
            "code": e.target.code.value,
            "phoneNumber": tel.tel
        }));
        dispatch(loadingPage(true));
    }
    const resetCurrentCode = () => {
        clearTimeout(times);
        setMyTime(200);
        dispatch(resetCode(tel.tel));
        toast.success("sms code " + tel.tel + " ga yuborildi")
    }

    return (
        <Container className={'passwordConfirmation'} fluid={true}>
            <Row className={'justify-content-center'}>
                <Col xs={12} sm={8} md={6} lg={4} xl={4} className={'my-code shadow p-5'} style={{marginTop: '20%'}}>
                    <Form className={'text-center'} onSubmit={submitCode}>
                        <div className={'d-flex justify-content-center'}>
                            <Button variant={'outline-dark'}>{myTime} sekund</Button>
                            <Button variant={'outline-dark'} onClick={resetCurrentCode}> <GrPowerReset/></Button>
                        </div>
                        <br/>
                        <div style={{color: '#0b7203'}}>Telefonizga kelgan kodni kiriting</div>
                        <br/>
                        <Form.Control type={'number'} minLength="4" name={"code"}
                                      onWheel={(e) => e.target.blur()} autocomplete="off" required/>
                        <br/>
                        <Button variant={"success"} size={'sm'} type={'submit'}>
                            TAYYOR
                        </Button>
                    </Form>
                </Col>
            </Row>

        </Container>
    );
}

export default CodeConfirmation;
