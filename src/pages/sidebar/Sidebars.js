import React from 'react';
import Sidebar from "../components/Sidebar";
import { Route, Routes } from "react-router-dom";
import About from "./About";
import Product from "../product/Product";
import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../login/image/img.png"
import RegionDepartment from "../departments/RegionDepartment";
import Age from "../age/Age";
import Department from "../departments/Department";
import Mtt from "../mtt/Mtt";
import Meal from "../meal/Meal";
import MultiMenu from "../multimenu/MultiMenu";
import MultiMenuOne from "../multimenu/MultiMenuOne";

function Sidebars() {
    return (
        <div>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand>
                        <img src={logo} alt="" width={60} height={60} />
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link>
                            Nodavlat
                            <br />
                            maktabgacha
                            ta`lim tashkilotlari
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Sidebar>
                <Routes>
                    <Route path="/" element={<About />} />
                    <Route path="/mtt" element={<Mtt />} />
                    <Route path="/meal" element={<Meal />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/age" element={<Age />} />
                    <Route path="/admin" element={<About />} />
                    <Route path="/super-admin" element={<About />} />
                    <Route path="/region-department" element={<RegionDepartment />} />
                    <Route path="/department" element={<Department />} />
                    <Route path="/multiMenu" element={<MultiMenu />} />
                    <Route path="/multi-menu-one/:id" element={<MultiMenuOne />} />
                </Routes>
            </Sidebar>
        </div>
    );
}

export default Sidebars;
