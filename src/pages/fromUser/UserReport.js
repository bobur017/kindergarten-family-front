import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Container, Form, FormText, InputGroup, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {getFilesReports, getUserReport} from "../FilesReducer";
import {Document, Page} from "react-pdf/dist/umd/entry.webpack5";
import FileDownload from "js-file-download";
import {type} from "@testing-library/user-event/dist/type";
import axios from "axios";
import {baseUrl} from "../../Default";
import {getToken} from "../more/Functions";
import {toast} from "react-toastify";

function UserReport() {
    const FileDownload = require('js-file-download');
    const [state, setState] = useState("Sana tanlanmagan !");
    const [fileState, setFileState] = useState();
    const dispatch = useDispatch();
    const files = useSelector(state => state.file.userReport)
    const firstUpdate = useRef(false);
    const history = useNavigate();

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
        }
    }, []);

    useEffect(() => {
        console.log(files, "files")
        if (files !== '') {
            setFileState(new Blob([files], {type: "application/pdf"}));
        }
    }, [files]);

    const submitDate = (e) => {
        e.preventDefault();
        let list = e.target.date.value.split('-')
        const date = {month: list[1], year: list[0]}
        // history(`/userReport?month=${list[1]}&year=${list[0]}`)

        axios({
            baseURL: baseUrl(),
            url: "/report/checkFile",
            headers: {
                Authorization: getToken()
            },
            params: date,
        }).then(res => {
            dispatch(getUserReport(date));
        }).catch(err => {
            toast.error("Hisobot mavjud emas!")
        });
        setState(e.target.date.value)
    }

    function onDocumentLoadSuccess({numPages}) {
        setNumPages(numPages);
    }

    const customList = (num) => {
        let list = []
        for (let i = 1; i < num + 1; i++) {
            list.push(i);
        }
        return list;
    }
    const downLoad = () => {
        console.log(files);
        if (files !== '') {
            FileDownload(files, 'filename.pdf');
        }
    }

    const axiosReport = (params) => {

    }

    return (
        <Container fluid>
            <Row className={'g-0 justify-content-center'}>
                <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                    <Form onSubmit={submitDate} className={'d-flex m-2'}>
                        <Row>

                            <Col xs={12} sm={12}>
                                <FormText>Hisobotni ko'rish uchun sanani tanlang</FormText>
                                <InputGroup className="mb-3 d-flex" style={{height: 40}}>
                                    <InputGroup.Text id="basic-addon1">{state}</InputGroup.Text>
                                    <Form.Control
                                        name={'date'}
                                        required
                                        type={'month'}
                                        placeholder="Username"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                            </Col>
                            <Col xs={12} sm={12}>
                                <Button variant={'success'} size={'sm'} type={'submit'}
                                        style={{width: 100, height: 40, marginLeft: 5}}>Tayyor</Button>
                                <Button variant={'outline-dark'} size={'sm'}
                                        style={{width: 100, height: 40, marginLeft: 5}}
                                        onClick={downLoad}>Yuklash</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <div className={'scrollPdf'}>
                    <Document file={fileState}
                              error={"Kutilmagan muammo"}
                              noData={"Hisobot hali tanlanmadi"}
                              loading={"Yuklanmoqda..."}
                              onLoadSuccess={onDocumentLoadSuccess}>
                        {customList(numPages)?.map((page, index) => (
                            <Page key={index} pageNumber={page}/>
                        ))}
                    </Document>
                    <p>
                        Sahifa {pageNumber} dan {numPages}
                    </p>
                </div>

            </Row>
        </Container>
    );
}

export default UserReport;
