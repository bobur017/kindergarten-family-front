import React, {useEffect, useState} from 'react';
import { FormCheck, ToggleButton} from "react-bootstrap";
import {forEach} from "react-bootstrap/ElementChildren";

function CheckBoxCustom({list, getChecked,editList,edited}) {
    const [checkeds, setCheckeds] = useState([]);
    const [checked, setChecked] = useState(false);

    useEffect(() => {

        setCheckeds(list)
    }, [list])

    useEffect(() => {
        setCheckeds(list);
    }, [list])

    useEffect(() => {
        if (edited){
            setCheckeds(list.map(item => {
                if(checkIdEmpty(item.id)){
                    return {...item,checked:true}
                }else {
                    return item;
                }
            }))
        }
    }, [edited]);


    const checkIdEmpty = (id) => {
        console.log(editList,id);
        return editList?.filter(item => item.id === id).length !== 0;

    }
    const checkedItem = (index) => (e) => {
        let list1 = [...checkeds];
        list1[index] = {...list1[index], "checked": e.target.checked}
        getChecked(list1.filter(item => item.checked === true));
        setCheckeds(list1);
    }

    const allChecked = (state) => {
        let list1 = checkeds.map((item) => (
            {...item, checked: state}
        ))
        getChecked(list1.filter(item => item.checked === true));
        setCheckeds(list1)
        setChecked(state);
    }


    return (
        <div>
            {/*<Button variant={'outline-info'} size={'sm'} type={''}>*/}
            {/*    Hammasini beldilash*/}
            {/*</Button>*/}
            <br/>
            <ToggleButton
                className="mb-2"
                id="toggle-check"
                type="checkbox"
                variant={checked ? "outline-primary" : "outline-secondary"}
                checked={checked}
                onClick={() => allChecked(!checked)} value={"1"}>
                Hammasini belgilash
            </ToggleButton>
            <br/>
            {
                checkeds?.map((item, index) =>
                    <FormCheck type={'checkbox'} key={index} checked={item.checked ? item.checked : ''}
                               onChange={checkedItem(index)} label={item.name}/>
                )
            }
        </div>
    );
}

export default CheckBoxCustom;