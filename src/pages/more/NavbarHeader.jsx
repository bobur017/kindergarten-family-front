import React from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {GrAdd} from "react-icons/gr";

function NavbarHeader({name,handleShow,buttonName}) {
    return (
        <>
            <div className='w-100 bottom-line justify-content-end text-center' style={{backgroundColor:'white',borderRadius:10}}>
                <Col xs={12} sm={12} md={7} lg={9} xl={9} style={{fontSize: 25}}>
                    {name}
                </Col>
                <Col md={3} lg={2} xl={2} className='d-flex justify-content-center'>
                    {buttonName ? <Button variant='info' size={'sm'} className='iconTextPosition d-flex' onClick={handleShow}>
                        <div className={'my-icons'}><GrAdd size={23} color={'#ffffff'}/></div>
                        <span style={{marginLeft: 5, width: '8rem'}}>{buttonName}</span>
                    </Button> : null}
                </Col>
            </div>
            <br/>
        </>
    );
}

export default NavbarHeader;
