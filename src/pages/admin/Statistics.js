import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAreaPayments} from "../area/AreaReducer";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Address from "../address/Address";
import {getRoleStorage, TimestampToInputDate} from "../more/Functions";

function Statistics(props) {
    const {areaPayments, result} = useSelector(state => state.area);
    const firstUpdate = useRef(false);
    const [params, setParams] = useState({end: '', districtId: '', regionId: '', start: ''});
    const dispatch = useDispatch();
    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getAreaPayments(params));
        }
    }, [])

    const getDistrict = (data) => {
        setParams({...params,districtId: data.id})
        console.log(data.id)
    }
    const getRegion = (region) => {
        setParams({...params,regionId: region.id})
        console.log(region.id)
    }

    return (
        <div>
            <div>
                {getRoleStorage() === "ROLE_PROGRAMMER" || getRoleStorage() === "ROLE_TECHNOLOGIST" ? <Container fluid={true}>
                    <Row>
                        <Col xs={12} sm={12} md={6} className={"d-flex justify-content-center align-items-center"}>
                            <Row>
                                <Col>
                                    <Form.Control placeholder="Boshlanish sana" type={"date"}
                                                  onChange={(e) => setParams({
                                                      ...params,
                                                      start: new Date(e.target.value).getTime()
                                                  })} value={TimestampToInputDate(params.start)}/>
                                </Col>
                                <Col>
                                    <Form.Control placeholder="Tugash sana" min={TimestampToInputDate(params.start)}
                                                  type={"date"} onChange={(e) => setParams({
                                        ...params,
                                        end: new Date(e.target.value).getTime()
                                    })} value={TimestampToInputDate(params.end)}/>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Address view={true} district={getDistrict} region={getRegion}/>
                        </Col>
                        <Col xs={12}>
                            <Button variant={"success"}
                                    onClick={() => dispatch(getAreaPayments(params))}>Tayyor</Button>
                        </Col>
                    </Row>
                </Container>: null}
            </div>
            <div className={"figma-card mt-3"}>
                <div className={"tableCalendar"}>
                    <table>
                        <thead>
                        <th>#</th>
                        <th>Ismi</th>
                        <th>To'lov summasi</th>
                        <th>Tegishli summa</th>
                        </thead>
                        <tbody>
                        {
                            areaPayments.map((item, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.paymentUserName}</td>
                                    <td>{item.pasSum}</td>
                                    <td>{item.share}</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Statistics;
