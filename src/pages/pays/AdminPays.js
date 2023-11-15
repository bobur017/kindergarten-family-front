import React, {useEffect, useRef, useState} from 'react';
import {Button, Card, Col, Container, Form, FormLabel, InputGroup, Modal, Row} from "react-bootstrap";
import Balance from "../fromUser/Balance";
import payme from "../file/button_medium_UZ.svg";
import {useDispatch, useSelector} from "react-redux";
import CustomTabs from "../more/CustomTabs";
import {AiOutlineMinusCircle, AiOutlinePlusCircle} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {getBalancesHistory} from "../fromUser/reducers/BalanceREducer";

function Pays(props) {
    const userR = useSelector(state => state.user)
    const [balance, setBalance] = React.useState(60000);
    const [discount, setDiscount] = React.useState(0);
    const [count, setCount] = React.useState(1);
    const [currentNavs, setCurrentNavs] = React.useState(0);
    const [show, setShow] = useState(false);
    const firstUpdate = useRef(false);

    const dispatch = useDispatch();
    const history = useNavigate();
    const historyBalance = useSelector(state => state.balance.history);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getBalancesHistory());
        } else {
            console.log(historyBalance, "history")
        }
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const forPaysCalculate = (num) => {
        if (num > 0) {
            setCount(num);
            if (num > 11) {
                setBalance(num * 42000);
                setDiscount((num * 60000) - (num * 42000));
            } else {
                setBalance(num * 60000);
            }
        }

    }
    return (
        <div>
            <div className={"p-2"}>
                <div>
                    <div className={"figma-card mt-2 position-relative mt-5"}>
                        <div className={"position-absolute d-flex justify-content-center mx-auto"} style={{top:-40,width:'97%'}}>
                            <div className={"shadow bg-white p-2 text-center payStyle"}>
                                <div className={"fs-4"}>To'lovlar tarixi</div>
                                <div>Hisobingizda: <span className={"fw-bolder"}>{userR.user?.balance}</span> so'm mavjud</div>
                            </div>
                        </div>
                        <br/>
                        {
                            historyBalance?.map((item, index) =>
                                <div key={index} className={"d-flex justify-content-between p-2 payBottomLine"}>
                                    <div className={"d-flex align-items-center"}>
                                        <div
                                            className={item?.state ? "kicon kicon-vectorDown" : "kicon kicon-vectorUp"}></div>
                                        <div>
                                            <div>
                                                {item?.transferType}
                                            </div>
                                            <div>{item?.description} {!item?.state ? <span> uchun</span> : null}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            {new Date(item?.createDate).toLocaleDateString()} {new Date(item?.createDate).toLocaleTimeString().substring(0, 5)}
                                        </div>
                                        <div>
                                            {item.state ? <span style={{color: 'green'}}>+ {item?.totalSum}</span> :
                                                <span style={{color: 'red'}}>- {item?.totalSum}</span>}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pays;
