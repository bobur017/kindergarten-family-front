import React, {useEffect, useRef, useState} from 'react';
import {
    Button,
    Col,
    Container,
    Form,
    FormLabel,
    InputGroup,
    Modal,
    OverlayTrigger,
    Popover,
    Row
} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {addBalance, getBalances} from "./reducers/BalanceREducer";
import {monthName} from "../more/Functions";
import CustomMedia from "../more/CustomMedia";
import {GrChapterNext, GrChapterPrevious} from "react-icons/gr";
import {loadingPage} from "../login/ReducerLogin";

function Balance() {
    const [showPopover, setShowPopover] = useState(false);
    const [desktop, setDesktop] = useState(false);
    const [payHistory, setPayHistory] = useState([]);
    const [month, setMonth] = useState("Oyni tanlang");
    const {user} = useSelector(state => state.user)
    const [payState, setPayState] = useState();
    const [year, setYear] = useState({year: new Date().getFullYear()});
    const billing = useSelector(state => state.balance.balances);
    const result = useSelector(state => state.balance.result);
    const error = useSelector(state => state.balance.error);
    const dispatch = useDispatch();
    const firstUpdate = useRef(true);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setPayState({});
        setShow(false)
    };
    const handleShow = (data) => {
        setPayState(data)
        setShow(true)
    };

    const desktopChange = (data) => {
        setDesktop(data);
    }
    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(getBalances(year))// returns the current year
            dispatch(loadingPage(false));
        }
    }, [result])
    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(loadingPage(false));
        }
    }, [error])

    useEffect(() => {
        setPayHistory(billing);
    }, [billing])

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getBalances(year))// returns the current year
        }else {
            console.log(user);
        }
    }, [user])

    const payToMonth = (data) => {
        dispatch(addBalance({year: data?.year, month: data?.month}));
        setShowPopover(false);
        dispatch(loadingPage(true));
        handleClose();
    }

    const getYear = (data) => {
        setYear({year: data});
        dispatch(getBalances({year: data}));
    }

    return (
        <div>
            <div className={"figma-card"}>
                <div>Hisobingizda {user?.balance} so'm mavjud</div>
            </div>
            <br/>
            <Container fluid>
                <Row className={'justify-content-center'}>
                    <Col className={'d-flex text-center justify-content-center'}>
                        <Button variant={"outline-dark"} size={'sm'} onClick={() => getYear(year.year - 1)}
                                className={'mx-3'}><GrChapterPrevious/></Button>
                        <div>{year.year} - yil</div>
                        <Button variant={"outline-dark"} size={'sm'}
                                onClick={() => getYear(year.year + 1)} className={'mx-3'}><GrChapterNext/></Button>
                    </Col>
                </Row>
            </Container>
            <br/>
            <table className={'table table-bordered text-center'}>
                <thead>
                <tr>
                    <td>#</td>
                    {/*<td>Yil</td>*/}
                    <td>Oy</td>
                    <td>Holat</td>
                </tr>
                </thead>
                <tbody>
                {
                    payHistory.map((item, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            {/*<td>{item.year}</td>*/}
                            <td>{monthName(item.month)}</td>
                            <td>{item.paymentStatus ? <span style={{color: 'green'}}>To'langan</span> :
                                <Button variant="outline-success" size={"sm"}
                                        onClick={() => handleShow(item)}>To'lash</Button>
                            }</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <CustomMedia func={desktopChange} myMedia={'(min-width: 320px)'}/>

            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header>
                    <Modal.Title className={"text-center"}> <strong style={{color: 'red'}}>Rostdan ham shu oy uchun to'lov
                        qilmoqchimisiz!</strong>
                        <br/></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={"d-flex justify-content-around"}>
                        <Button variant="danger"
                                onClick={() => handleClose()}>Bekor qilish</Button>
                        <Button variant="success"
                                onClick={() => payToMonth(payState)}>To'lov qilish</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Balance;
