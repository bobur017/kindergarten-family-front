import React from 'react';
import './myButtons.scss'
import {IoMdArrowBack, IoMdArrowForward} from "react-icons/io";

function FromPageSizeBottom({pageSize, allPageSize, currentPage, changesPage}) {
    return (
        <div className={`w-100 d-flex justify-content-center mb-3`}>
            <button className={'mx-1 myDarkButtons'} onClick={() => changesPage(currentPage - 1)}
                    disabled={currentPage === 0}><IoMdArrowBack size={20}/></button>
            {currentPage - 1 > 0 ? <button className={'mx-1 myDarkButtons'}
                                           onClick={() => changesPage(currentPage - 2)}>{currentPage - 1}</button> : null}
            {currentPage > 0 ? <button className={'mx-1 myDarkButtons'}
                                       onClick={() => changesPage(currentPage - 1)}>{currentPage}</button> : null}
            <div className={'mx-1 myDarkButtons2'}>{currentPage ? currentPage + 1 : 1}</div>
            {currentPage + 1 < allPageSize ?
                <button className={'mx-1 myDarkButtons'}
                        onClick={() => changesPage(currentPage + 1)}>{currentPage + 2}</button> : null}
            {currentPage + 2 < allPageSize ?
                <button className={'mx-1 myDarkButtons'}
                        onClick={() => changesPage(currentPage + 2)}>{currentPage + 3}</button> : null}
            <button className={'mx-1 myDarkButtons'} disabled={currentPage + 1 === allPageSize}
                    onClick={() => changesPage(currentPage + 1)}><IoMdArrowForward size={20}/></button>
        </div>
    );
}

export default FromPageSizeBottom;
