import React, {useEffect, useRef} from 'react';
import {Button} from "react-bootstrap";
import {Document, Page} from "react-pdf/dist/umd/entry.webpack";
import {useState} from "react";
import {baseUrl} from "../../Default";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getFile} from "../FilesReducer";

function MenuFile() {
    const [menuId, setMenuId] = useState(useParams("menuId"));
    const [numPages, setNumPages] = useState(null);
    const [base64, setBase64] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const dispatch = useDispatch();

    function onDocumentLoadSuccess({numPages}) {
        setNumPages(numPages);
    }

    const firstUpdate = useRef(false)
    const file = useSelector(state => state.file.file);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true
            // dispatch(getFile(menuId.menuId));
        } else {

        }
    }, [menuId])


    return (
        <div>
            <Link to={'/user/menu'}>
                <Button variant={'primary'}>
                    Ortga
                </Button>
            </Link>
            <div>
                {/*<Document file={file}*/}
                <Document file={file}
                          error={"Kutilmagan muammo"}
                          noData={"Hisobot hali tanlanmadi"}
                          loading={"Yuklanmoqda..."}
                          onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber}/>
                </Document>
                <p>
                    Page {pageNumber} of {numPages}
                </p>
                {/*<iframe src={URL.createObjectURL(file)} height={400} width={200}></iframe>*/}
            </div>
        </div>
    );
}

export default MenuFile;
