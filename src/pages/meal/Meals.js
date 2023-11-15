import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {getMenuOne} from "../multimenu/MultiMenuReducer";
import {getMeal, getMeals} from "./MealReducer";
import NavbarHeader from "../more/NavbarHeader";
import {Col, Container, Form, InputGroup, Row} from "react-bootstrap";

function Meals() {
    const [state, setState] = useState();
    const dispatch = useDispatch();
    const history = useNavigate();
    const stateSelector = useSelector(state => state.meal.meals);
    const firstUpdate = useRef(false);
    const reportId = useParams("id");
    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getMeals(reportId?.id))
        } else {
            console.log(stateSelector, "stateSelector");
        }
    }, [stateSelector]);

    return (
        <div>
            <NavbarHeader name={"Kunlik taomnoma"}/>
            <div className={"figma-card-first mt-3"}>
                <Container fluid={true}>
                    <Row className={'figma-card-first'}>
                        <Col className={'d-flex align-items-center justify-content-around'}>
                            {stateSelector?.kindergartenName !== null ?
                                <>
                                    <button className={'buttonInfo mx-1'}
                                            onClick={() => pushMenuId()}>Batafsil
                                    </button>
                                    <button className={'buttonPdf mx-1'} style={{width: 100}}
                                            onClick={() => getFiles("pdf")}>PDF
                                    </button>
                                    {/*<button className={'buttonExcel mx-1'} onClick={() => getFiles("excel")}>Excel*/}
                                    {/*</button>*/}
                                </>
                                : null}
                        </Col>
                        <Col className={"mt-2 d-flex justify-content-center"}>
                            <InputGroup>
                                <InputGroup.Text id="basic-addon1">Sana</InputGroup.Text>
                                <Form.Control onChange={getByDate} type={'date'} name={'date'}/>
                            </InputGroup>
                        </Col>
                    </Row>
                </Container>
                {stateSelector?.kindergartenName !== null ?
                    <div className={'figma-card mt-3'}>
                        <div>
                            <div className={"d-flex justify-content-between"}>
                                <div className={'fs-5 fw-bolder mb-2'}>Taomnoma</div>
                                <button className={"buttonExcel"} onClick={() => history("/sidebar/user/meals")}>Taomlar</button>
                            </div>
                            <br/>
                            <div className={'infoText'}>
                                <div>MTT</div>
                                <div>{stateSelector?.kindergartenName}</div>
                            </div>
                            <div className={'infoText'}>
                                <div>Sana</div>
                                <div>{stateSelector.year + "-" + stateSelector.month + "-" + stateSelector.day}</div>
                            </div>
                            <div className={'infoText'}>
                                <div>Menyu nomi</div>
                                <div>{stateSelector?.menu?.multiMenuName}</div>
                            </div>
                            <div className={'infoText'}>
                                <div>Kuni</div>
                                <div>{stateSelector?.menu?.name}</div>
                            </div>
                        </div>
                    </div> :
                    <div className={"figma-card text-center fs-3 mt-3"} style={{color: '#e58107'}}>Bu kunga taomnoma
                        biriktirilmagan</div>}
                {stateSelector?.kidsNumber?.subDTO ? <div className={'figma-card mt-3'}>
                        <div className={'fs-5 fw-bolder'}> Kiritilgan bolalar soni</div>
                        {stateSelector?.kidsNumber?.subDTO?.map((age, index2) =>
                            < div key={index2} className={'infoText'}>
                                <div>{age?.ageGroupName}</div>
                                <div>{age?.number}</div>
                            </div>
                        )}
                    </div> :
                    <div className={"figma-card text-center fs-3 mt-3"} style={{color: '#e58107'}}>Bu kunga bolalar soni
                        kiritilmagan</div>}
            </div>
        </div>
    );
}

export default Meals;
