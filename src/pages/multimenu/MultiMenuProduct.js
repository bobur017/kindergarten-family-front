import React, {useEffect, useRef, useState} from 'react';
import {getMultiMenuProduct, getMultiMenuProductFile} from "./MultiMenuReducer";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";

function MultiMenuProduct(props) {
    const dispatch = useDispatch();
    const history = useNavigate();
    const firstUpdate = useRef(false);
    const multiMenu = useSelector(state => state.multiMenu);
    const [multiMenuId, setMultiMenuId] = useState(useParams("id"));

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getMultiMenuProduct(multiMenuId?.id));
        }
    }, [])

    const totalSum = (list) => {
        let total = 0;
        list.forEach(item =>
            total = item.weight + total);
        return total.toFixed(2);
    }
    const tbodyT = (list) => {
        let trows = [];
        let count = 0;
        list.forEach((item, index) => {
                item.productWeightList?.forEach((item2, index2) => {
                        count = count + 1;
                        if (index2 === 0) {
                            trows.push(
                                <tr key={index}>
                                    <td rowSpan={item?.productWeightList?.length}>{index + 1}</td>
                                    <td rowSpan={item?.productWeightList?.length}>{item?.sanPinCategoryName}</td>
                                    <td>{count}</td>
                                    <td>{item2?.productName}</td>
                                    {
                                        item2.dateWeightList?.map((item3, index3) =>
                                            <td key={index3}>{item3?.weight?.toFixed(2)}</td>
                                        )
                                    }
                                    <td>{totalSum(item2?.dateWeightList)}</td>
                                    <td rowSpan={item?.productWeightList?.length}>{item?.planWeight.toFixed(2)}</td>
                                    <td rowSpan={item?.productWeightList?.length}>{item?.doneWeight.toFixed(2)}</td>
                                    <td rowSpan={item?.productWeightList?.length}>{((item?.doneWeight / item?.planWeight) * 100).toFixed(2)}</td>
                                </tr>)
                        } else {
                            trows.push(
                                <tr key={index2}>
                                    <td>{count}</td>
                                    <td>{item2?.productName}</td>
                                    {
                                        item2.dateWeightList?.map((item3, index3) =>
                                            <td key={index3}>{item3?.weight?.toFixed(2)}</td>
                                        )
                                    }
                                    <td>{totalSum(item2?.dateWeightList)}</td>
                                </tr>)
                        }
                    }
                )
            }
        )
        return trows;
    }
    const getFileProd = () => {
        dispatch(getMultiMenuProductFile(multiMenuId?.id));
    }

    const fileRender = () => {
        return (
            <div className={"miniTable3 p-3"}>
                <div>
                    <button className={"buttonPdf"} onClick={getFileProd}>PDF</button>
                </div>
                <br/>
                {multiMenu.multiMenuProduct?.length > 0 ? <table className={"text-center"}>
                        <thead>
                        <tr>
                            <th>T/r</th>
                            <th>SanPin kategoriya nomi</th>
                            <th>T/r</th>
                            <th>Maxsulot nomi</th>
                            {multiMenu.multiMenuProduct?.length > 0 ? multiMenu.multiMenuProduct[0].productWeightList[0]?.dateWeightList?.map((item, index) =>
                                <th key={index}>{item?.day}</th>
                            ) : null}
                            <th>Jami</th>
                            <th>Me'yor</th>
                            <th>Haqiqatda</th>
                            <th>Bajarilishi (%)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            multiMenu.multiMenuProduct?.length > 0 ?
                                tbodyT(multiMenu.multiMenuProduct) : null
                        }
                        </tbody>
                    </table> :
                    <div className={"w-100 fs-3 text-center"} style={{color: 'red'}}>Mahsulotlar mavjud emas!</div>}
            </div>
        )
    }

    return (
        <div className={"p-2 figma-card-first"}>
            <div>
                <button className={"buttonPdf"} onClick={()=>history("/sidebar/user/menu")}>Ortga</button>
            </div>
            {fileRender()}
        </div>
    );
}

export default MultiMenuProduct;
