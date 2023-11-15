import {Route, Routes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/fromIcons.scss';
import './styles/myStyles.scss';
import Login from "./pages/login/Login";
import React from "react";
import AllComponents from "./pages/AllComponents";
import LoadingPageReducer from "./pages/LoadingPageReducer";

function App() {
    return (
        <div style={{backgroundColor:'#F0FFFF',minHeight:'100vh'}}>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/sidebar/*" element={<AllComponents/>}/>
            </Routes>
            <ToastContainer position={'top-center'} autoClose={5000}/>
            <LoadingPageReducer/>
        </div>
    );
}

export default App;
