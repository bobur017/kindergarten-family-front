import React from 'react';
import {Tab, Tabs} from "react-bootstrap";
import './product.css'
import ProductList from "./ProductList";
import ProductCategory from "./ProductCategory";
import Sanpin from "./Sanpin";

const Product = () => {

    return (
        <div>
            <Tabs
                defaultActiveKey="home"
                id="justify-tab-example"
                className="mb-3"
                justify
            >
                <Tab eventKey="home" title="Mahsulotlar" className={'tabActive'}>
                    <ProductList/>
                </Tab>
                <Tab eventKey="profile" title="Mahsulot turlari" className={'tabActive'}>
                    <ProductCategory/>
                </Tab>
                <Tab eventKey="longer-tab" title="SANPIN meyor" className={'tabActive'}>
                    <Sanpin/>
                </Tab>
            </Tabs>
        </div>
    );
};

export default Product;