import React, { Component } from 'react';
import { Nav, Navbar, NavLink, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";


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
                <NavLink  eventKey="1" as={Link} to="/events">Events</NavLink>
                <NavLink  eventKey="1" as={Link} to="/donations">Donations</NavLink>
                    <NavLink  eventKey="1" as={Link} to="/blogs">Blogs</NavLink>
                    <NavDropdown title="About" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/team">Meet our Team!</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/faqs">FAQ</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/contact">Contact</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to="/account">Sign Out</NavDropdown.Item>
                    </NavDropdown>
            </Nav>
        </Navbar.Collapse>     
    </Navbar>
    );
}
 
export default Navigationbar;