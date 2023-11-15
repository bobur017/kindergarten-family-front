import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Form, Modal} from "react-bootstrap";
import {addManager, getUsers} from "../fromUser/reducers/UserInfoReducer";
import Address from "../address/Address";
import {getAddress} from "../address/AddressReducer";
import {addArea, chiqim, deleteArea, getArea} from "../area/AreaReducer";
import {toast} from "react-toastify";

function AddManager(props) {

    const user = {
        "fatherName": "",
        "name": "",
        "password": "",
        "phoneNumber": "",
        "surname": ""
    }
    const pathId = useParams("id");
    const [userState, setUserState] = useState(user);
    const [renderNum, setRenderNum] = useState(0);
    const [districts, setDistricts] = useState([]);
    const [params, setParams] = useState({userId: '', districtId: '', regionId: ''});

    const dispatch = useDispatch();
    const history = useNavigate();
    const {users} = useSelector(state => state.user);
    const {address} = useSelector(state => state.address);
    const {areas, result,error} = useSelector(state => state.area);
    const firstUpdate = useRef(false);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setUserState(user);
        setShow(false)
    };
    const handleShow = (num) => {
        setRenderNum(num)
        setShow(true)
    };


    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getUsers());
            dispatch(getAddress());
        }
    }, [])

    useEffect(() => {
        if (firstUpdate.current) {
            setUserState(user);
        }
    }, [areas, result,error]);

    useEffect(() => {
        if (firstUpdate.current) {
            handleClose();
        }
    }, [result,error])
    const submitManager = (e) => {
        e.preventDefault();
        dispatch(addManager(userState));
    }
    const renderAddFormManager = () => {
        return (
            <Form onSubmit={submitManager}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Ismi</Form.Label>
                    <Form.Control value={userState.name}
                                  type={"text"}
                                  required
                                  size={"sm"}
                                  name={"name"}
                                  onChange={e => setUserState({...userState, [e.target.name]: e.target.value})}/>

                    <Form.Label>Familyasi</Form.Label>
                    <Form.Control value={userState.surname}
                                  type={"text"}
                                  size={"sm"}
                                  required
                                  name={"surname"}
                                  onChange={e => setUserState({...userState, [e.target.name]: e.target.value})}/>

                    <Form.Label>Otasining ismi</Form.Label>
                    <Form.Control value={userState.fatherName}
                                  type={"text"}
                                  required
                                  size={"sm"}
                                  name={"fatherName"}
                                  onChange={e => setUserState({...userState, [e.target.name]: e.target.value})}/>

                    <Form.Label>Telefon raqami</Form.Label>
                    <Form.Control value={userState.phoneNumber}
                                  size={"sm"}
                                  name={"phoneNumber"}
                                  required
                                  onChange={e => setUserState({...userState, [e.target.name]: e.target.value})}/>
                    <Form.Label>Parol</Form.Label>
                    <Form.Control value={userState.password}
                                  size={"sm"}
                                  name={"password"}
                                  required
                                  onChange={e => setUserState({...userState, [e.target.name]: e.target.value})}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" type={"button"} onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type={"submit"}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        )
    }
    const chiqimArea = (e) => {
        e.preventDefault();
        dispatch(chiqim({userId: params.userId, summa: e.target.summa.value, description: e.target.description.value}))
    }
    const openChiqim = (data) => {
        setUserState(data);
        setParams({...params, userId: data.id})
        handleShow(2);
    }
    const chiqimAreaRender = () => {
        return (

            <form onSubmit={chiqimArea}>
                <Modal.Header closeButton>
                    <div className={"text-center w-100"}>{userState.name} {userState.surname} </div>
                </Modal.Header>
                <Modal.Body>
                    <input type="number" name={"summa"} required={true} placeholder={"Summa "}/>
                    <input type="text" name={"description"} placeholder={"Izoh "}/>
                    <button className={"buttonExcel mt-2"} type={"submit"}>Tayyor</button>
                </Modal.Body>
            </form>
        )
    }
    const getDistrict2 = (e) => {
        setDistricts(address?.filter(item => item.id === parseInt(e.target.value))[0]?.districtList);
        setParams({...params, regionId: e.target.value});
    }
    const getDistrictId = (e) => {
        setParams({...params, districtId: e.target.value})
    }
    const renderAddArea = () => {
        return (<Form className={"p-3"}>
            <div className={"miniTable1"}>
                <table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Ismi</th>
                        <th>Tumani</th>
                        <th>Foizi</th>
                        <th>O'chirish</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        areas?.map((user, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user?.users?.name} {user?.users?.surname} </td>
                                <td>{user?.districtName}</td>
                                <td>{user?.percentage}</td>
                                <td>
                                    <button className={"buttonPdf"}
                                            type={"button"}
                                            onClick={() => dispatch(deleteArea(user))}>O'chirish
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>

        </Form>)
    }
    const onClickUser = (num, item) => {
        setRenderNum(num);
        let usr = {...params, userId: item.id};
        dispatch(getArea(usr));
        setParams(usr);
        handleShow(num);
    }
    const submitPercentage = (user, e) => {
        e.preventDefault();
        if (params.districtId) {
            dispatch(addArea(null, {
                districtId: params.districtId,
                percentage: e.target.percentage.value,
                userId: user.id
            }));
            setUserState(user);
        } else {
            toast.error("Tumanni tanlang!");
        }
    }

    return (
        <div className={"p-1"}>
            <div className={"figma-card"}>
                <div className={"d-flex align-items-center"}>
                    <button className={"buttonExcel my-2"} onClick={() => handleShow(0)}>Marketolog qo'shoish</button>
                    <div className={"row"} style={{height: 30}}>
                        <select onChange={getDistrict2} className={"mx-3 col-4 col-md-4 col-lg-5 col-sm-3"}>
                            <option value="">Viloyatni tanlang</option>
                            {address?.map((item, index) => <option value={item.id} key={index}>
                                {item.name}
                            </option>)}
                        </select>
                        <select onChange={getDistrictId} className={"col-4 col-md-4 col-lg-5 col-sm-3"}>
                            <option value="">Tumanni tanlang</option>
                            {districts?.map((item, index) => <option value={item.id} key={index}>
                                {item.name}
                            </option>)}
                        </select>
                    </div>
                </div>
                <div className={"miniTable1"}>
                    <table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Ismi</th>
                            <th>Hisobi</th>
                            <th>Ustama foizi</th>
                            <th>Tayyor</th>
                            <th>To'lov</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            users?.map((user, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td onClick={() => onClickUser(1, user)}>{user?.name}</td>
                                    <td>{user?.balance}</td>
                                    <td>{userState.id === user.id ?
                                        <form id={"percentageForm" + index} onSubmit={(e) => submitPercentage(user, e)}>
                                            <input
                                                max={100}
                                                type="number" name={"percentage"} required={true}/></form>
                                        : null}
                                    </td>
                                    <td>{userState.id === user.id ? <button className={"buttonExcel"} type={"submit"}
                                                                            form={"percentageForm" + index}>Tayyor
                                    </button> : <button className={"buttonInfo"} onClick={() => setUserState(user)}
                                                        type={"button"}>Foiz kiritish
                                    </button>}
                                    </td>
                                    <td>
                                        <button className={"buttonExcel"} onClick={() => openChiqim(user)}>To'lov
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} centered>
                {renderNum === 0 ? renderAddFormManager() : null}
                {renderNum === 1 ? renderAddArea() : null}
                {renderNum === 2 ? chiqimAreaRender() : null}
            </Modal>
        </div>
    );
}

export default AddManager;
