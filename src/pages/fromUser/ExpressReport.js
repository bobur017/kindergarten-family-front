import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Container, Form, Offcanvas, Row, Table} from "react-bootstrap";
import {addReportMonth, getReportMonth} from "../report/ReportReducer";
import MultiMenyuListStyle from "../more/MultiMenyuListStyle";
import ReactApexChart from "react-apexcharts";
import {colorTextStr} from "../more/Functions";
import {useMediaQuery} from "react-responsive";
import {loadingPage} from "../login/ReducerLogin";
import {toast} from "react-toastify";

function ExpressReport({setCurrentkidsNumber, currentTabs}) {
    const dto = {
        "kidsNumberList": [
            {
                "date": "",
                "id": '',
                "subDTO": [
                    {
                        "ageGroupId": '',
                        "ageGroupName": "string",
                        "id": '',
                        "number": ''
                    }
                ]
            }
        ],
        "menuId": "",
        "month": '',
        "year": '',
    }

    const isDesktop = useMediaQuery({query: '(min-width: 447px)'});
    const isDesktop2 = useMediaQuery({query: '(min-width: 510px)'});
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const pie = {
        series: [14, 85],
        options: {
            colors: ['#BABDC6', '#00A859'],
            labels: ['Bajarilmadi %', 'Bajarildi %'],
            chart: {
                type: 'donut',
            },
            legend: {
                show: false
            },
            dataLabels: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            total: {
                                showAlways: true,
                                show: true,
                                label: "Sanpin"
                            },
                        }
                    }
                }
            },

        },
    }
    const [stateReport, setStateReport] = useState(dto);
    const [multiMenuOne, setMultiMenuOne] = useState();
    const dispatch = useDispatch();
    const history = useNavigate();
    const {reportMonth, error, result} = useSelector(state => state.report);
    const firstUpdate = useRef(false);
    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(loadingPage(false));
            setStateReport(dto);
            setMultiMenuOne({});
            setCurrentkidsNumber(0);
        }
    }, [result]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
        } else {
            let dataMenu = reportMonth?.multiMenuList?.filter((item => item.select))[0]
            setMultiMenuOne(dataMenu);
            setStateReport({...reportMonth, menuId: dataMenu?.id});
        }
    }, [reportMonth]);

    const submitRepo = (e) => {
        setStateReport({
            ...stateReport,
            [e.target.name]: e.target.value,
        });
        if (e.target.name === "month" && stateReport.year) {
            dispatch(getReportMonth({
                year: stateReport.year,
                month: e.target.value,
            }))
        } else if (e.target.name === "year" && stateReport.month) {
            dispatch(getReportMonth({
                year: e.target.value,
                month: stateReport.month,
            }))
        }
    }
    const changeKidsNumber = (index, index2) => (e) => {
        let kidsNumberList = [...stateReport.kidsNumberList];
        let subDTO = [...kidsNumberList[index].subDTO];
        subDTO[index2] = {...subDTO[index2], number: e.target.value};
        kidsNumberList[index] = {...kidsNumberList[index], subDTO};
        setStateReport({...stateReport, kidsNumberList});
    }
    const submitKindsNumber = () => {
        if (stateReport.menuId) {
            dispatch(addReportMonth(stateReport));
            dispatch(loadingPage(true));
        } else {
            toast.error("Menyu tanlamadingiz");
        }
    }
    const getMultiMenu = (data) => {
        setMultiMenuOne(data);
        setStateReport({...stateReport, menuId: data?.id})
        handleClose()
    }
    return (
        <div className={"p-2"}>
            <div className={"figma-card-first"}>
                <div>
                    <Form onSubmit={submitRepo}>
                        <Container>
                            <Row>
                                <Col xs={12} sm={12} md={5} lg={5}>
                                    <Form.Select aria-label="Floating label select example" className={"mt-2"}
                                                 onChange={submitRepo} value={stateReport?.year || ""}
                                                 size={"sm"}
                                                 name={"year"}
                                                 required>
                                        <option value="">Yilni tanlang</option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                    </Form.Select>
                                </Col>
                                <Col xs={12} sm={12} md={5} lg={5}>
                                    <Form.Select aria-label="Floating label select example" className={"mt-2"}
                                                 onChange={submitRepo} value={stateReport.month || ""}
                                                 size={"sm"} required
                                                 name={"month"}>
                                        <option value="">Oyni tanlang</option>
                                        <option value="1">Yanvar</option>
                                        <option value="2">Fevral</option>
                                        <option value="3">Mart</option>
                                        <option value="4">Aprel</option>
                                        <option value="5">May</option>
                                        <option value="6">Iyun</option>
                                        <option value="7">Iyul</option>
                                        <option value="8">Avgust</option>
                                        <option value="9">Sentabr</option>
                                        <option value="10">Oktabr</option>
                                        <option value="11">Noyabr</option>
                                        <option value="12">Dekabr</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </div>
                {stateReport.kidsNumberList.length > 1 ? <div>
                    <div>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} className={"shadow p-2 mt-2"}
                             style={{backgroundColor: 'white'}}>
                            <div className={multiMenuOne?.select ? "px-2 my-card" : "px-2"}>
                                <div className={'d-flex justify-content-between align-items-center'}>
                                    <Container fluid={true}>
                                        {multiMenuOne ? <Row>
                                            <Col>
                                                <div className={`my-Hover text-center`}>
                                                    <div style={{fontSize: 25}}
                                                         className={'fw-semibold'}>{multiMenuOne?.name}</div>
                                                    <div
                                                        style={{fontSize: 20}}>{multiMenuOne?.daily} kun uchun
                                                        mo‘ljallangan
                                                    </div>
                                                    <br/>
                                                </div>
                                            </Col>
                                            <Col className={" d-flex justify-content-between align-items-center"}>
                                                <div
                                                    className={'w-100 d-flex justify-content-between align-items-center'}>
                                                    <ReactApexChart options={{
                                                        ...pie.options,
                                                        colors: ['#BABDC6', colorTextStr(multiMenuOne?.sanPinPercentage)],
                                                        plotOptions: {
                                                            pie: {
                                                                donut: {
                                                                    labels: {
                                                                        show: true,
                                                                        total: {
                                                                            showAlways: true,
                                                                            show: true,
                                                                            fontSize: isDesktop ? '10px' : '6',
                                                                            label: "Sanpin \n o'rtacha",
                                                                            formatter: function (w) {
                                                                                return multiMenuOne?.sanPinPercentage;
                                                                            }
                                                                        },
                                                                        value: {
                                                                            fontSize: 10,
                                                                            offsetY: -4
                                                                        },
                                                                        name: {
                                                                            fontSize: 10,
                                                                            offsetY: -4
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        },
                                                    }}
                                                                    series={[multiMenuOne?.sanPinPercentage > 100 ? 0 : 100 - multiMenuOne?.sanPinPercentage, multiMenuOne?.sanPinPercentage]}
                                                                    type="donut"
                                                                    width={isDesktop2 ? 150 : isDesktop ? 130 : 80}
                                                                    height={isDesktop2 ? 150 : isDesktop ? 130 : 100}/>
                                                    <ReactApexChart options={{
                                                        ...pie.options,
                                                        colors: ['#BABDC6', colorTextStr(multiMenuOne?.sanPinPercentageMax)],
                                                        plotOptions: {
                                                            pie: {
                                                                donut: {
                                                                    labels: {
                                                                        show: true,
                                                                        total: {
                                                                            showAlways: true,
                                                                            show: true,
                                                                            fontSize: isDesktop ? '10px' : '6',
                                                                            label: "Sanpin max",
                                                                            formatter: function (w) {
                                                                                return multiMenuOne?.sanPinPercentageMax;
                                                                            }
                                                                        },
                                                                        value: {
                                                                            fontSize: 10,
                                                                            offsetY: -4
                                                                        },
                                                                        name: {
                                                                            fontSize: 10,
                                                                            offsetY: -4
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }}
                                                                    series={[multiMenuOne?.sanPinPercentageMax > 100 ? 0 : 100 - multiMenuOne?.sanPinPercentageMax, multiMenuOne?.sanPinPercentageMax]}
                                                                    type="donut"
                                                                    width={isDesktop2 ? 150 : isDesktop ? 130 : 80}
                                                                    height={isDesktop2 ? 150 : isDesktop ? 130 : 100}/>

                                                    <ReactApexChart options={{
                                                        ...pie.options,
                                                        colors: ['#BABDC6', colorTextStr(multiMenuOne?.sanPinPercentageMin)],
                                                        plotOptions: {
                                                            pie: {
                                                                donut: {
                                                                    labels: {
                                                                        show: true,
                                                                        total: {
                                                                            showAlways: true,
                                                                            show: true,
                                                                            fontSize: isDesktop ? '10px' : '6',
                                                                            label: "Sanpin min",
                                                                            formatter: function (w) {
                                                                                return multiMenuOne?.sanPinPercentageMin;
                                                                            }
                                                                        },
                                                                        value: {
                                                                            fontSize: 10,
                                                                            offsetY: -4
                                                                        },
                                                                        name: {
                                                                            fontSize: 10,
                                                                            offsetY: -4
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        },
                                                    }}
                                                                    series={[multiMenuOne?.sanPinPercentageMin > 100 ? 0 : 100 - multiMenuOne?.sanPinPercentageMin, multiMenuOne?.sanPinPercentageMin]}
                                                                    type="donut"
                                                                    width={isDesktop2 ? 150 : isDesktop ? 130 : 80}
                                                                    height={isDesktop2 ? 150 : isDesktop ? 130 : 100}/>
                                                </div>
                                            </Col>
                                        </Row> : <div>Menyu Tanlanmagan</div>}
                                    </Container>
                                </div>
                            </div>
                        </Col>
                    </div>

                    <div className={"d-flex justify-content-around mt-2 mb-2"}>
                        <Button variant="info" className="mx-1" onClick={handleShow}>
                            Menyular
                        </Button>
                        <Button onClick={submitKindsNumber} variant={"success"}>Hisobotni shakllantirish</Button>
                    </div>
                    <div>
                        <Table size={'sm'} className={"shadow"}>
                            <thead>
                            <tr>
                                <th>Kunlar</th>
                                {stateReport.kidsNumberList.length > 0 ? stateReport.kidsNumberList[0]?.subDTO.map((ageGroup, index) =>
                                    <th className={"text-end"} key={index}><span
                                        className={"mx-2"}>{ageGroup?.ageGroupName}</span></th>
                                ) : null
                                }
                            </tr>
                            </thead>
                            <tbody>
                            {
                                stateReport.kidsNumberList.map((item, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        {/*<div>{new Date(item.date).toLocaleDateString()}</div>*/}
                                        {
                                            item.subDTO.map((ageGroup, index2) =>
                                                <td className={"text-end"} key={index2}><input
                                                    type="number" value={ageGroup.number}
                                                    onChange={changeKidsNumber(index, index2)} min={0}
                                                    className={"myInput"}/></td>
                                            )
                                        }
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    </div>
                </div> : null}
            </div>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menyularni tanlang</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <MultiMenyuListStyle multiMenuList={stateReport?.multiMenuList} selectMultiMenu={getMultiMenu}/>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default ExpressReport;
