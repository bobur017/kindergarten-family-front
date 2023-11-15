import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Form} from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {toast} from 'react-toastify';
import {getAddress} from './AddressReducer';

function Address({district, region, view}) {
    const [addressState, setAddressState] = useState([]);
    const [regionState, setRegionState] = useState([]);
    const address = useSelector(state => state.address.address)
    const error = useSelector(state => state.address.error)
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);


    useEffect(() => {
        setAddressState(address);
    }, [address]);


    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            if (address.length === 0) {
                dispatch(getAddress());
            }
        }
    }, []);


    const getRegion = (e) => {
        var list = addressState?.filter(item => item.id === parseInt(e.target.value));
        if (list.length !== 0) {
            setRegionState(list[0].districtList);
            if (view) {
                region(list[0])
            }
        }
    }
    const getDistrict = (e) => {
        var list = regionState?.filter(item => item.id === parseInt(e.target.value));
        if (list.length !== 0) {
            district(list[0]);
        }
    }

    return (
        <>
            <Form.Text>Viloyat</Form.Text>
            <Form.Select required name='region' onChange={getRegion} size={"sm"}>
                <option value="">Viloyatni tanlang</option>
                {
                    addressState?.map((item, index) => (
                        <option key={index} value={item.id}>{item.name}</option>
                    ))
                }
            </Form.Select>
            <br/>
            {view ?
                <>
                    <Form.Text>Tuman</Form.Text>
                    <Form.Select required name='district' onChange={getDistrict} size={"sm"}>
                        <option value="">Tumanni tanlang</option>
                        {
                            regionState?.map((item, index) => (
                                <option key={index} value={item.id}>{item.name}</option>
                            ))
                        }
                    </Form.Select>
                </>
                : null}
        </>
    );
}

export default Address;
