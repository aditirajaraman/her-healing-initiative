import React, { Component } from 'react';
import { Nav, Navbar, NavLink, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Avatar } from 'primereact/avatar';
const userAvatar =  require("../assets/images/aditi.jpg");

const Navigationbar = () => {
    return (
        <Navbar collapseOnSelect expand="sm" bg="light" data-bs-theme="light">
        <Navbar.Brand href="#home">
            <img src="https://herinitiative.or.tz/logo192.png" width="150" height="100" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" data-bs-toggle="collapse" data-bs-target="#navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
            <Nav className="justify-content-center" style={{ flex: 1}}>
                <NavLink  eventKey="1" as={Link} to="/">Home</NavLink>
                <NavLink  eventKey="1" as={Link} to="/listevents">Events</NavLink>
                    <NavLink  eventKey="1" as={Link} to="/blogs">Blogs</NavLink>
                    <NavDropdown title="About" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/team">Meet our Team!</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/faqs">FAQ</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/contact">Contact</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to="/login">Sign in</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/account">Sign Out</NavDropdown.Item>
                    </NavDropdown>
            </Nav>
        </Navbar.Collapse>               
        <div id="wrapper">
            <div id="right">
                <Avatar image={userAvatar} className="mr-2" size="large" shape="circle" />
            </div>
        </div>  
    </Navbar>
    );
}
 
export default Navigationbar;