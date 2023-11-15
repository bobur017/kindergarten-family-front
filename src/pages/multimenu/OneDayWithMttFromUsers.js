import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import {toast} from "react-toastify";
import NavbarHeader from "../more/NavbarHeader";
import {getMenuReport, oneDayFromAll} from "../report/ReportReducer";
import {Document, Page} from "react-pdf/dist/umd/entry.webpack5";
import axios from "axios";
import {loadingPage} from "../login/ReducerLogin";

function OneDayWithMttFromUsers({id}) {
    const [fileType, setFileType] = useState();
    const dispatch = useDispatch();
    const history = useNavigate();
    // const menuOneDay = useSelector(state => state.report.menuOneDay);
    const stateSelector = useSelector(state => state.report.oneDay)
    const menuOneDayReport = useSelector(state => state.report.menuOneDayReport)
    const firstUpdate = useRef(false);
    const FileDownload = require('js-file-download');

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        if (firstUpdate.current) {
            axios({
                url: "https://mtt-menyu.uz/"+menuOneDayReport,
                method: 'GET',
                responseType: 'blob', // Important
            }).then((response) => {
               setFileType(response.data);
                console.log(response.data)
                // FileDownload(response.data, 'report.pdf');
            });
        console.log("ishlash");
        }
        dispatch(loadingPage(false));
    }, [menuOneDayReport]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(oneDayFromAll());
        } else {
        }
    }, [stateSelector]);

    const getByDate = (e) => {
        dispatch(oneDayFromAll({date: new Date(e.target.value).getTime()}));
    }
    const getFiles = (type) => {
        setFileType(type);
        dispatch(getMenuReport({type, reportId: stateSelector?.id}));
        dispatch(loadingPage(true));
    }

    const pushMenuId = () => {
        if (stateSelector?.menu?.id) {
            history("/sidebar/user/one-day-menu-report/" + stateSelector?.id)
        } else {
            toast.error("Bu kunga menyu biriktirilmagan!");
        }
    }
    function onDocumentLoadSuccess({numPages}) {
        setNumPages(numPages);
    }

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
                                {/*<button className={"buttonExcel"} onClick={() => history("/sidebar/user/meals/")}>Taomlar</button>*/}
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
            {/*{menuOneDayReport ? <iframe src={menuOneDayReport} title={"title"} height={400} width={200}></iframe>:null}*/}
            {/*{fileType ? <div className={'scrollPdf mt-3'}>*/}
            {/*    <Document file={fileType}*/}
            {/*              error={"Kutilmagan muammo"}*/}
            {/*              noData={"Hisobot hali tanlanmadi"}*/}
            {/*              loading={"Yuklanmoqda..."}*/}
            {/*              onLoadSuccess={onDocumentLoadSuccess}>*/}
            {/*        <Page pageNumber={pageNumber}/>*/}
            {/*    </Document>*/}
            {/*    <p>*/}
            {/*        Sahifa {pageNumber} dan {numPages}*/}
            {/*    </p>*/}
            {/*</div> : null}*/}
        </div>
    );
}

export default OneDayWithMttFromUsers;
