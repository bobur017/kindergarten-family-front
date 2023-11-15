import React, {useEffect, useRef, useState, useMemo} from 'react';
import {Button, Col, Container, Form, Modal, Row, Table} from 'react-bootstrap';
import {GrAdd, GrNewWindow} from 'react-icons/gr'
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import Address from '../address/Address';
import {
    addRegionDepartment,
    deleteRegionDepartment,
    editRegionDepartment,
    getRegionDepartment
} from './RegionDepartmentReducer';


function RegionDepartment() {
    const [department, setDepartment] = useState({id: '', name: '', regionId: ''});
    const dispatch = useDispatch();
    const [departments, setDepartments] = useState([]);
    const departmentReducer = useSelector(state => state.department);
    const firstUpdate = useRef(true);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setDepartment({id: '', name: '', regionId: ''});
        setShow(false)
    };
    const handleShow = () => setShow(true);


    useEffect(() => {
        if (!firstUpdate.current) {
            dispatch(getRegionDepartment());
            handleClose();
        }

    }, [departmentReducer.result]);


    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            dispatch(getRegionDepartment());
            console.log("useEffect1",firstUpdate.current);
        } else {
            console.log("useEffect2",firstUpdate.current);
        }
    }, []);

    useEffect(()=>{
        setDepartments(departmentReducer.regionDepartments);
    },[departmentReducer.regionDepartments])

    const getRegion = (data) => {
        setDepartment({...department, "regionId": data.id})
    }

    const submitdepartment = (e) => {
        e.preventDefault();
        if (department.id !== '') {
            dispatch(editRegionDepartment(department));
        } else {
            dispatch(addRegionDepartment(department))
        }
    }

    const onChanges = (param) => (e) => {
        setDepartment({...department, [param]: e.target.value});
    }

    const onClickDepartment = (data, number) => {
        if (number === 1) {
            setDepartment(data);
            handleShow();
        } else if (number === 2) {
            dispatch(deleteRegionDepartment(data));
        }
    }

    return (
        <div>

            <Row className='bottom-line justify-content-end text-center'>
                <Col xs={12} sm={12} md={7} lg={9} xl={9} style={{fontSize: 25}}>
                    Boshqarmalar Bo'limi
                </Col>
                <Col md={3} lg={2} xl={2} className='d-flex justify-content-center' onClick={handleShow}>
                    <Button variant='info' size={'sm'} className='iconTextPosition d-flex'>
                        <div className={'my-icons'}><GrAdd size={23} color={'#ffffff'}/></div>
                        <span style={{marginLeft: 5}}>Boshqarma_qo'shish</span>
                    </Button>
                </Col>
            </Row>
            <br/>
            <Table bordered size='sm' className='text-center'>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Nomi</th>
                    <th>Manzili</th>
                    <th>O'zgartirish</th>
                    <th>O'chirish</th>
                </tr>
                </thead>
                <tbody>
                {
                    departments?.map((item, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.regionName}</td>
                            <td>
                                <Button variant='outline-info' size='sm' onClick={() => onClickDepartment(item, 1)}>
                                    O'zgartirish
                                </Button>
                            </td>
                            <td>
                                <Button variant='outline-danger' size='sm' onClick={() => onClickDepartment(item, 2)}>
                                    O'chirish
                                </Button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={submitdepartment}>
                    <Modal.Header closeButton>
                        <Modal.Title>{department.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control name='name' required value={department.name} onChange={onChanges("name")}
                                      placeholder="Nomi "/>
                        <br/>
                        <Address view={false} region={getRegion}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Ortga
                        </Button>
                        <Button variant="primary" type='submit'>
                            Tayyor
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default RegionDepartment;