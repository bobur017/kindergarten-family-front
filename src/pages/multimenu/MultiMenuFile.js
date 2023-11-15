import React, {useEffect} from 'react';
import {Button} from "react-bootstrap";
import {Document, Page} from "react-pdf/dist/umd/entry.webpack5";
import {useState} from "react";
import {baseUrl} from "../../Default";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getMultiMenuFile} from "../FilesReducer";

function MultiMenuFile() {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [multiMenuId, setMultiMenuId] = useState(useParams("mMenuId"));
    const dispatch = useDispatch();
    const file = useSelector(state => state.file.multiMenu);


    useEffect(() => {
        dispatch(getMultiMenuFile(multiMenuId?.mMenuId));
    }, [])

    useEffect(() => {
        // console.log(file);
    }, [file])


    function onDocumentLoadSuccess({numPages}) {
        setNumPages(numPages);
    }
    const customList = (num) => {
        let list=[]
        for (let i = 1; i < num+1; i++) {
            list.push(i);
        }
        return list;
    }

    return (
        <div>
            <Link to={'/user/menu'}>
                <Button variant={'primary'}>
                    Ortga
                </Button>
            </Link>
            <div>
                <Document file={file}
                          error={"Kutilmagan muammo"}
                          noData={"Hisobot hali tanlanmadi"}
                          loading={"Yuklanmoqda..."}
                          onLoadSuccess={onDocumentLoadSuccess}>
                    {customList(numPages)?.map((page,index) => (
                        <Page key={index} pageNumber={page} />
                    ))}
                </Document>
                <p>
                    Page {pageNumber} of {numPages}
                </p>
            </div>
        </div>
    );
}

export default MultiMenuFile;