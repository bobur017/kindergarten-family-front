import React, {useEffect} from 'react';
import {ImExit} from "react-icons/im";
import './navbarStyle.css'
import {Link} from "react-router-dom";
import {checkRoleFromNav, getRoleStorage, pushToLogin} from "./Functions";
import {fromNavbarMobile} from "./FromNavbarFunc";

function MyNavbar(props) {
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
    }, []);

    const renderNav = () => {
        let list = fromNavbarMobile(getRoleStorage());
       return list.map((item, index) =>
           <li className={"aaaa"} key={index}>
            <Link to={item?.path}>
                        <span className={'d-flex align-items-center'}>
                        <div className={`${item?.icon}`}>{item?.icon2}</div>
                            <span className={"my-text"}>{item?.name}</span>
                        </span>
            </Link>
        </li>);

    }

    return (
        <nav id={'myNavbar'} className="shadow">
            <ul>
                { renderNav()}
                {/*<li className={"aaaa"}>*/}
                {/*    <Link to={"/sidebar/user/menu"}>*/}
                {/*    <span className={'d-flex align-items-center'}>*/}
                {/*        <div className={"kicon kicon-menu"}></div>*/}
                {/*        <span className={"my-text"}>Menyu</span>*/}
                {/*    </span>*/}
                {/*    </Link>*/}
                {/*</li>*/}
                {/*<li className={"aaaa"}>*/}
                {/*    <Link to={"/sidebar/user/childrenNumber"}>*/}
                {/*        <span className={'d-flex align-items-center'}>*/}
                {/*        <div className={"kicon kicon-kids"}></div>*/}
                {/*        <span className={"my-text"}>Bolalar soni</span>*/}
                {/*    </span>*/}
                {/*    </Link>*/}
                {/*</li>*/}
                {/*<li className={"aaaa"}>*/}
                {/*    <Link to={"/sidebar/user/report"}>*/}
                {/*        <span className={'d-flex align-items-center'}>*/}
                {/*        <div className={"kicon kicon-report"}></div>*/}
                {/*        <span className={"my-text"}>Hisobotlar</span>*/}
                {/*    </span>*/}
                {/*    </Link>*/}
                {/*</li>*/}
                {/*<li className={"aaaa"}>*/}
                {/*    <Link to={"/sidebar/user/pays"}>*/}
                {/*        <span className={'d-flex align-items-center'}>*/}
                {/*        <div className={"kicon kicon-pay"}></div>*/}
                {/*        <span className={"my-text"}>To'lovlar</span>*/}
                {/*    </span>*/}
                {/*    </Link>*/}
                {/*</li>*/}
                <li className={"aaaa"} style={{bottom: 0, position: 'fixed', paddingLeft: 15}}
                    onClick={() => pushToLogin()}>
                        <span>
                        <ImExit size={25} color={"#F08D34"}/>
                        <span className={"my-text"}>Chiqish</span>
                    </span>
                </li>
            </ul>
        </nav>
    );
}

export default MyNavbar;
