import React, {useMemo} from 'react';
import NavbarHeader from "../more/NavbarHeader";
import {Button, Form, Modal, Table, Row, Col, InputGroup} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addSanpinCategory, deleteSanpinCategory, editSanpinCategory, getSanpinCategory} from "./SanpinCategoryReducer";
import {getAge} from "../age/AgeReducer";
import DropdownCustom from "../more/DropdownCustom";
import {checkSame, deleteSame} from "../more/Functions";
import {toast} from "react-toastify";
import {FiMinus} from "react-icons/fi";

function Sanpin() {
    const [show, setShow] = useState(false);
    const [sanpinCategoryState, setsanpinCategoryState] = useState({
        id: '',
        name: '',
        dailyNormDTOList: []
    });
    const [sanpinCategories, setSanpinCategories] = useState([]);
    const [ages, setAges] = useState([]);
    const handleClose = () => {
        setShow(false);
        setsanpinCategoryState({id: '', name: '', dailyNormDTOList: []});
    };
    const handleShow = (data) => {
        if (data){
        setsanpinCategoryState({id: '', name: '', dailyNormDTOList: []});
        }
        setShow(true)
    };
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const sanpinCategory = useSelector(state => state.sanpinCategory)
    const age = useSelector(state => state.age)

    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(getSanpinCategory());
            handleClose();
        }
    }, [sanpinCategory.result])
    useMemo(() => {
        setAges(age.ages);
    }, [age.ages]);

    useMemo(() => {
        setSanpinCategories(sanpinCategory.sanpinCategory);
    }, [sanpinCategory.sanpinCategory]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getSanpinCategory());
            dispatch(getAge());
        }
    }, [])

    const submitSanpinCategory = (e) => {
        e.preventDefault();
        console.log(sanpinCategoryState)
        if (sanpinCategoryState.id !== '') {
            // dispatch(editSanpinCategory(sanpinCategoryState));
        } else {
            // dispatch(addSanpinCategory(sanpinCategoryState))
        }
    }

    const getAgeItem = (data) => {
        var list = [...sanpinCategoryState.dailyNormDTOList];
        if (!checkSame(list, data, "ageGroupId", "id")) {
            list.push({ageGroupId: data.id, weight: '', name: data.name})
        } else {
            toast.error("Bunday yosh toifasi tanlangan!")
        }
        setsanpinCategoryState({...sanpinCategoryState, dailyNormDTOList: list});
    }

    const deleteAgeFromInput = (index,item) => {
        let list = [...sanpinCategoryState.dailyNormDTOList];
        setsanpinCategoryState({...sanpinCategoryState, dailyNormDTOList: deleteSame(list,item,"ageGroupId","ageGroupId")});
        // setsanpinCategoryState({...sanpinCategoryState, dailyNormDTOList: list.splice(index, 1)});
    }

    const onClickSanpinCategory = (data, number) => {
        if (number === 1) {
            setsanpinCategoryState(data);
            handleShow(null);
        } else if (number === 2) {
            dispatch(deleteSanpinCategory(data));
        }
    }

    const onChanges = (index) => (e) => {
        if (e.target.name === 'name'){
            setsanpinCategoryState({...sanpinCategoryState,[e.target.name]:e.target.value})
        }else {
            var list = [...sanpinCategoryState.dailyNormDTOList];
            list[index] = {...list[index], weight: e.target.value}
            setsanpinCategoryState({...sanpinCategoryState, dailyNormDTOList: list});
        }
    }


    return (
        <div>
            <NavbarHeader name={"Sanpin turlari bo'limi"} handleShow={handleShow}
                          buttonName={"Sanpin_turini qo'shish"}/>
            <Table bordered size='sm' className='text-center'>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Nomi</th>
                    <th>O'zgartirish</th>
                    <th>O'chirish</th>
                </tr>
                </thead>
                <tbody>
                {
                    sanpinCategories?.map((item, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>
                                <Button variant='outline-info' size='sm' onClick={() => onClickSanpinCategory(item, 1)}>
                                    O'zgartirish
                                </Button>
                            </td>
                            <td>
                                <Button variant='outline-danger' size='sm'
                                        onClick={() => onClickSanpinCategory(item, 2)}>
                                    O'chirish
                                </Button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={submitSanpinCategory}>
                    <Modal.Header closeButton>
                        <Modal.Title>{sanpinCategoryState.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <DropdownCustom name={"Yosh toifasini tanlsh"} list={ages} setData={getAgeItem}/>
                        <br/>
                        <Form.Control name='name' required value={sanpinCategoryState.name} onChange={onChanges()}
                                      placeholder="Nomi "/>
                        <br/>
                        {sanpinCategoryState?.dailyNormDTOList?.map((item, index) =>
                            <InputGroup className="mb-3" key={index} size={'sm'}>
                                <InputGroup.Text style={{width: '50%'}}><span style={{color: 'green'}}>Yosh toifasi nomi:</span> {item.name}
                                </InputGroup.Text>
                                <Form.Control name={'weight'} type={'number'} step={'0.01'}
                                              onWheel={(e) => e.target.blur()} value={item.weight}
                                              onChange={onChanges(index)} size={'sm'}  required />
                                <InputGroup.Text>
                                    <Button variant={'danger'} onClick={() => deleteAgeFromInput(index,item)}>
                                        <FiMinus/>
                                    </Button>
                                </InputGroup.Text>
                            </InputGroup>
                        )}
                        <br/>
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

export default Sanpin;
