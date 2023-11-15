import React, {useEffect} from 'react';
import './navbarStyle.css'
import {Link, useNavigate} from "react-router-dom";
import {fromNavbarMobile} from "./FromNavbarFunc";
import {getRoleStorage} from "./Functions";

function MyMobileNavbar(props) {
    const history = useNavigate();

    const renderNav = () => {
        let list = fromNavbarMobile(getRoleStorage());
        return list.map((item, index) =>
            <li key={index}>
            <Link to={item?.path}>
                <div className={'d-flex align-items-center justify-content-center'}>
                    <div className={`${item?.icon} text-center`}>{item?.icon2}</div>
                </div>
                <div>{item?.name}</div>
            </Link>
        </li>);

    }

    return (
        <nav id={"mobile-navbar"} className={'shadow text-center'}>
            <ul className={"d-flex justify-content-between px-2"}>
                {renderNav()}
                {/*<li>*/}
                {/*    <Link to={"/sidebar/user/menu"}>*/}
                {/*        <div className={"d-flex justify-content-center"}>*/}
                {/*            <div className={"kicon kicon-menu text-center"}></div>*/}
                {/*        </div>*/}
                {/*        <span>*/}
                {/*                Menyular*/}
                {/*        </span>*/}
                {/*    </Link>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*    <Link to={"/sidebar/user/childrenNumber"}>*/}
                {/*        <div className={"d-flex justify-content-center"}>*/}
                {/*            <div className={"kicon kicon-kids text-center"}></div>*/}
                {/*        </div>*/}
                {/*        <span>*/}
                {/*                Bolalar soni*/}
                {/*        </span>*/}
                {/*    </Link>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*    <Link to={"/sidebar/user/report"}>*/}
                {/*        <div className={"d-flex justify-content-center"}>*/}
                {/*            <div className={"kicon kicon-report text-center"}></div>*/}
                {/*        </div>*/}
                {/*        <span>*/}
                {/*                Hisobotlar*/}
                {/*            </span>*/}
                {/*    </Link>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*    <Link to={"/sidebar/user/pays"}>*/}
                {/*        <div className={"d-flex justify-content-center"}>*/}
                {/*            <div className={"kicon kicon-pay text-center"}></div>*/}
                {/*        </div>*/}
                {/*        <span>*/}
                {/*                To'lovlar*/}
                {/*        </span>*/}
                {/*    </Link>*/}
                {/*</li>*/}
            </ul>
        </nav>
    );
}

export default MyMobileNavbar;
