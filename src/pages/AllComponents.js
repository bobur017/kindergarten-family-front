import React from 'react';
import {Route, Routes} from "react-router-dom";
import Sidebars from "./sidebar/Sidebars";
import Reports from "./fromUser/Reports";
import CodeConfirmation from "./login/CodeConfirmation";
import User from "./user/User";
import MenuFile from "./multimenu/MenuFile";
import MultiMenuFile from "./multimenu/MultiMenuFile";
import'./allStyle.scss'
import'./allStyle2.scss'
import MultiMenuProduct from "./multimenu/MultiMenuProduct";
function AllComponents(props) {
    return (
        <div>
            <Routes>
                <Route path="/admin/*" element={<Sidebars/>}/>
                <Route path="/report/:reportId" element={<Reports/>}/>
                <Route path="/code/:tel" element={<CodeConfirmation/>}/>
                <Route path="/user/*" element={<User/>}/>
                <Route path="/menu/:menuId" element={<MenuFile/>}/>
                <Route path="/multi-menu/:mMenuId" element={<MultiMenuFile/>}/>
                <Route path="/multi-menu-product/:id" element={<MultiMenuProduct/>}/>
            </Routes>
        </div>
    );
}

export default AllComponents;
