import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import './userStyle.css'
import {Route, Routes} from "react-router-dom";
import UserInfo from "../fromUser/UserInfo";
import ChildrenNumber from "../fromUser/ChildrenNumber";
import NavbarHeaderUser from "../more/NavbarHeaderUser";
import MyNavbar from "../more/MyNavbar";
import MyMobileNavbar from "../more/MyMobileNavbar";
import MultiMenuOne from "../multimenu/MultiMenuOne";
import GetOneDayMenu from "../multimenu/GetOneDayMenu";
import GetOneDayMenuByReport from "../multimenu/GetOneDayMenuByReport";
import Reports from "../fromUser/Reports";
import Menues from "../multimenu/Menues";
import Pays from "../pays/Pays";
import Statistics from "../admin/Statistics";
import AddManager from "../admin/AddManager";
import PaysAdmin from "../admin/PaysAdmin";
import AdminPays from "../pays/AdminPays";

function User() {
    const userR = useSelector(state => state.user)
    const [userState, setUserState] = useState({id: '', name: ''});
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);

    useEffect(() => {
        setUserState(userR.user);
    }, [userR.user]);


    useEffect(() => {

    }, [])


    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
        }
    }, []);
    return (
        <div>

            <NavbarHeaderUser name={"Mening sahifam"}
                              buttonName={userState.name + "  " + userState.fatherName}/>
            <MyNavbar/>
            <MyMobileNavbar/>
            <div className={"main-body"} style={{paddingRight: 0}}>
                <Routes>
                    <Route path={"/statistics"} element={<Statistics/>}/>
                    <Route path={"/managers"} element={<AddManager/>}/>
                    <Route path={"/info"} element={<UserInfo/>}/>
                    <Route path={"/"} element={<UserInfo/>}/>
                    <Route path={"/menu"} element={<Menues/>}/>
                    <Route path={"/childrenNumber"} element={<ChildrenNumber/>}/>
                    <Route path="/report" element={<Reports/>}/>
                    <Route path="/multi-menu-one/:id" element={<MultiMenuOne/>}/>
                    <Route path="/one-day-menu/:id" element={<GetOneDayMenu/>}/>
                    <Route path="/one-day-menu-report/:id" element={<GetOneDayMenuByReport/>}/>
                    <Route path="/meals/:id" element={<GetOneDayMenu/>}/>
                    <Route path="/pays" element={<Pays/>}/>
                    <Route path="/pays-admin" element={<AdminPays/>}/>
                </Routes>
            </div>
            <br/>
            <br/>
            <br/>
        </div>
    );
}

export default User;
