import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addChildrenNumber,getChildrenNumbers, getChildrenNumbersByDate} from "./reducers/ChildrenNumberReducer";
import {
    Button,
    Col,
    Container,
    Form,
    InputGroup,
    Modal,
    Row,
    Table,
} from "react-bootstrap";
import {monthName} from "../more/Functions";
import {GrChapterNext, GrChapterPrevious} from "react-icons/gr";
import {getAge} from "../age/AgeReducer";

function ChildrenNumber() {
    const defaultChN = {
        "date": {},
        "subDTO": [
            {
                "ageGroupId": '',
                "id": '',
                "number": ''
            }
        ]
    }
    const defaultList = [
        {
            "childrenId": '',
            "childrenName": "",
            "id": '',
            "status": ""
        }
    ]
    const [childrenNumberState, setChildrenNumberState] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [numberOfChildren, setNumberOfChildren] = useState(defaultChN);
    const [dailyChildrenNumbers, setDailyChildrenNumbers] = useState(defaultList);
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const childrenNumber = useSelector(state => state.childrenNumber)
    const ages = useSelector(state => state.age.ages);
    const [showCanvas, setShowCanvas] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setNumberOfChildren(defaultChN);
        setShow(false);
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(getChildrenNumbers());
        }
    }, [childrenNumber.result]);

    useEffect(() => {
        setChildrenNumberState(childrenNumber);
    }, [childrenNumber.childrenNumbers]);

    useEffect(() => {
        let date = numberOfChildren?.date;
        let subDTO;
        if (childrenNumber.childrenNumber?.subDTO) {
            subDTO = childrenNumber.childrenNumber?.subDTO;
        } else {
            subDTO = ages.map((item) => {
                    return {
                        "ageGroupId": item.id,
                        "ageGroupName": item.name,
                        "id": '',
                        "number": ''
                    };
                }
            )
        }
        setNumberOfChildren({...numberOfChildren, subDTO, date});
    }, [childrenNumber.childrenNumber]);

    useEffect(() => {
        setDailyChildrenNumbers(childrenNumber.dailyChildrenNumbers);
        console.log(childrenNumber.dailyChildrenNumbers, "dailyChildrenNumbers");
    }, [childrenNumber.dailyChildrenNumbers]);

    // useEffect(() => {
    //     setAgesState(ages?.map(item => ({
    //         ...item, ageGroupId: item.id, number: '', ageGroupName: item.name
    //     })));
    // }, [ages]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getChildrenNumbers());
            dispatch(getAge());
        }
    }, []);


    const submitToServer = (e) => {
        e.preventDefault();
        dispatch(addChildrenNumber(numberOfChildren));
        handleClose();
    }
    const onClickChN = (data) => {
        setNumberOfChildren({...numberOfChildren, date: data?.date})
        dispatch(getChildrenNumbersByDate({date:data?.date}));
        handleShow();
    }

    const td = (list, indexes) => {
        let myList = []
        if (indexes === 0) {
            myList = list?.slice(indexes, indexes + 7);
        } else {
            myList = list?.slice(indexes + 1, indexes + 8);
        }
        return (
            myList?.map((item, index) =>
                <td key={index} style={index === 6 || index === 5 ? {color: '#e70000'} : null} className={"my-hover"}>
                    <div className={item?.state ? "tdColor" : null}
                        // style={!item.numberOfChildren ? {backgroundColor: '#bcfcd4'} : null}
                         onClick={() => onClickChN(item)}>
                        {item.day !== 0 ? item.day : null}</div>
                </td>
            )
        )
    }
    const getCalendar = (month1, year1, num) => {
        let month = month1;
        let year = year1;
        if (num === 1) {
            if (month === 13) {
                month = 1;
                year = year + 1
            }
        } else {
            if (month === 0) {
                month = 12;
                year = year - 1
            }
        }
        // console.log({month, year})
        dispatch(getChildrenNumbers({month, year}))
        setYear(year);
        setMonth(month);
    }

    const onChangeChildren = (index, item) => (e) => {
        let list = [...numberOfChildren?.subDTO];
        list[index] = {...list[index], number: parseInt(e.target.value)}
        setNumberOfChildren({...numberOfChildren, subDTO: list})
    }


    return (
        <div className={"bgColor-wh"}>
            <br/>
            <Container fluid>
                <Row className={'justify-content-center'}>
                    <Col>
                        <Row>
                            <Col className={"info-text justify-content-center d-flex align-items-center"}>
                                <div className={"menuColor"}></div>
                                <div className={"info-text mx-2"}>
                                    Bolalar soni kiritilgan kunlar
                                </div>
                            </Col>
                        </Row>
                        <br/>
                        <Row className={'justify-content-center shadow text-center'}>
                            <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                                <Button variant={"outline-dark"}
                                        onClick={() => getCalendar(childrenNumberState?.childrenNumbers.month - 1, childrenNumberState?.childrenNumbers.year, 2)}><GrChapterPrevious/></Button></Col>
                            <Col xs={8} sm={8} md={8} lg={8}
                                 xl={8}>{monthName(childrenNumberState?.childrenNumbers.month)} {childrenNumberState?.childrenNumbers.year}-yil</Col>
                            <Col xs={2} sm={2} md={2} lg={2} xl={2}><Button
                                variant={"outline-dark"}
                                onClick={() => getCalendar(childrenNumberState?.childrenNumbers.month + 1, childrenNumberState?.childrenNumbers.year, 1)}><GrChapterNext/></Button></Col>
                        </Row>
                        <Table bordered className={"text-center"}>
                            <thead>
                            <tr>
                                <th className={"thBackground"}>№</th>
                                <th className={"thBackground"}>Du</th>
                                <th className={"thBackground"}>Se</th>
                                <th className={"thBackground"}>Ch</th>
                                <th className={"thBackground"}>Pa</th>
                                <th className={"thBackground"}>Ju</th>
                                <th className={"thBackground"}>SH</th>
                                <th className={"thBackground"}>Ya</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                childrenNumberState?.childrenNumbers?.dayList?.map((item, index) => {
                                    if ((index + 1) % 7 === 0 || index === 0) {
                                        return (
                                            <tr key={index}>
                                                <td className={"thBackground"}>{index === 0 ? (index + 1) : ((index + 1) / 7) + 1}</td>
                                                {td(childrenNumberState?.childrenNumbers?.dayList, index)}
                                            </tr>
                                        )
                                    }
                                })
                            }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={submitToServer}>

                    <Modal.Header closeButton>
                        <Modal.Title>Bolalar soni</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            numberOfChildren?.subDTO?.map((item, index) =>
                                <InputGroup className="mb-3" key={index}>
                                    <InputGroup.Text id="basic-addon1">{item?.ageGroupName}</InputGroup.Text>
                                    <Form.Control
                                        type={'number'}
                                        onWheel={(e) => e.target.blur()}
                                        onChange={onChangeChildren(index, item)}
                                        value={item.number}
                                        name={"name"}
                                        required
                                    />
                                </InputGroup>
                            )
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" size={'sm'} onClick={handleClose}>
                            Ortga
                        </Button>
                        <Button variant="primary" size={'sm'} type={"submit"}>
                            Tayyor
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default ChildrenNumber;
