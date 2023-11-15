import {Button, Dropdown, InputGroup} from "react-bootstrap";
import React, {useEffect, useMemo, useState} from 'react';
import Form from 'react-bootstrap/Form';
import {toast} from "react-toastify";
import {ImBin} from "react-icons/im";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
    <Button
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
        variant={'outline-dark'}
        size={'sm'}
        className={"shadow"}
    >
        {children}
    </Button>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
    ({children, style, className, 'aria-labelledby': labeledBy}, ref) => {
        const [value, setValue] = useState('');

        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
                <Form.Control
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="   Qidirish..."
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        (child) =>
                            !value || child.props.children.toLowerCase().startsWith(value),
                    )}
                </ul>
            </div>
        );
    },
);

function MyDropdown({list, name, setData, editList, param}) {
    const [lists, setLists] = useState(list);
    const [stateList, setStateList] = useState([])

    const getItem = (data) => {
        const currentList = [...stateList];
        currentList.push({...data,"productId":data.id});
        if (stateList?.some(item => item[param] === data[param])) {
            toast.error("Bu avval tanlangan!");
        } else {
            setData(currentList);
            setStateList(currentList);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line valid-typeof
        if (editList?.length !== 0) {
            setStateList(editList);
        }
    }, [editList]);

    const removeItem = (index) => {
        const currentList = [...stateList];
        currentList.splice(index, 1);
        setData(currentList);
        setStateList(currentList);
    }
    const onChangeList = (index) => (e) => {
        let myList = [...stateList];
        myList[index] = {...myList[index],weight:e.target.value}
        setData(myList);
        setStateList(myList);
    }

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    {name}
                </Dropdown.Toggle>

                <Dropdown.Menu as={CustomMenu}>
                    {
                        lists?.map((item, index) =>
                            <Dropdown.Item key={index} value={item.id} onClick={() => getItem(item)}>{item?.name}</Dropdown.Item>
                        )
                    }
                </Dropdown.Menu>
            </Dropdown>
            {
                stateList?.map((item, index) =>
                    <span key={index}>
                        {/*<br/>*/}
                    <InputGroup size="sm" className="mb-1">
                        <InputGroup.Text id="inputGroup-sizing-sm" style={{width: '70%'}}>{item.name}</InputGroup.Text>
                        <Form.Control type={'number'} step={"0.01"} required name={"weight"} size={'sm'} value={item.weight ? item.weight : ""} onWheel={(e)=>e.target.blur()} onChange={onChangeList(index)} placeholder={"vazni"}/>
                        <InputGroup.Text><Button variant={'danger'} size={'sm'}
                                                 onClick={() => removeItem()}><ImBin/></Button> </InputGroup.Text>
                    </InputGroup>
                    </span>
                )
            }
        </>
    );
}

export default MyDropdown;
