import React from 'react';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMeal, deleteMeal, editMeal, getMeal } from "./MealReducer";
import {Button, Col, Form, Modal, Row, Tab, Table, Tabs} from "react-bootstrap";
import { GrAdd } from "react-icons/gr";
import MealList from "./MealList";
import MealCategory from "./MealCategory";
import MealTime from "./MealTime";


function Meal() {

    return (
        <div>
            <Tabs
                defaultActiveKey="home"
                id="fill-tab-example"
                className="mb-3"
                fill
            >
                <Tab eventKey="home" title="Taomlar"   className={'tabActive'}>
                    <MealList/>
                </Tab>
                <Tab eventKey="profile" title="Taom turlari"  className={'tabActive'}>
                    <MealCategory/>
                </Tab>
                <Tab eventKey="longer-tab" title="Taomlanish vaqtlari"  className={'tabActive'}>
                    <MealTime />
                </Tab>
            </Tabs>
        </div>
    );
}

export default Meal;