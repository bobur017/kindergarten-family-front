import React, {useEffect, useRef} from 'react';
import {useMediaQuery} from "react-responsive";

function CustomMedia({func,myMedia}) {
    const isDesktop = useMediaQuery({query:myMedia });
    const firstUpdate = useRef(false);

    useEffect(()=>{
        if(!firstUpdate.current){

        }
        func(isDesktop);
    },[isDesktop])
    return (
        <div></div>
    );
}

export default CustomMedia;