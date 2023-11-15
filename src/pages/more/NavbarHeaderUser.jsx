import React from 'react';
import {Button, Col, Container, Dropdown, Row} from "react-bootstrap";
import {FaUserAlt} from "react-icons/fa";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserCurrent} from "../fromUser/reducers/UserInfoReducer";
import {useMediaQuery} from "react-responsive";
import {IoMdNotificationsOutline} from "react-icons/io";
import logo from "../file/mtt-menu.jpg"
import {BsTelegram} from "react-icons/bs";

function NavbarHeader({name, handleShow, buttonName}) {

    const [state, setState] = useState();
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const isMobile = useMediaQuery({query: '(min-width: 768px)'})
    const user = useSelector(state => state.user.user)
    useEffect(() => {
        setState(user);
    }, [user])

    useEffect(() => {
        if (!firstUpdate.current) {
            dispatch(getUserCurrent());
            firstUpdate.current = true;
        }
    }, [])

    const style = () => {
        if (isMobile) {
            return {fontSize: 25}
        } else {
            return {fontSize: 19};
        }
    }
    return (
        <Container fluid style={{position: 'sticky', top: 0, zIndex: 10}} className={"myBgColor color-wh"}>
            <Row className='justify-content-end align-items-center text-center p-2'>
                <div className={"d-flex justify-content-between align-items-center"}>
                    <IoMdNotificationsOutline size={30}/>
                    <div>
                        <img src={logo} alt="logo" width={40}/>
                        <div>MTT-MENYU</div>
                    </div>
                    <div>
                        <div className={"bg-white"} style={{borderRadius: '50%'}}>
                            <a href={"https://t.me/mtt_menyu"}>
                                <BsTelegram color={'#29a8ea'} size={30}/>
                            </a>
                        </div>
                    </div>
                </div>
            </Row>
        </Container>

    );
}

export default NavbarHeader;
