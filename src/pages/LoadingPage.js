import React from 'react'
import { useState } from "react";
import ClockLoader from "react-spinners/ClockLoader";

function LoadingPage({ load }) {
    const [stateLoader, setStateLoader] = useState(true);
    if (!load) {
        return null;
    }
    return (
        <div className='headLoader'>
            <div className='loader'>
                <ClockLoader size={70} loading={stateLoader} />
                <br />
                <br />
                <br />
                <span style={{ fontSize: 30 }}>Iltimos jarayon yakunlanguncha kutib turing...</span>
            </div>
        </div>
    )
}

export default LoadingPage