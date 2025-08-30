import React, { useRef  } from 'react';
import { Nav, Navbar, NavLink, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Tooltip } from 'primereact/tooltip';
import { Avatar } from 'primereact/avatar';

import { useAuth } from '../context/AuthContext';

const Navigationbar = () => {
    const { user, token } = useAuth();
    const avatarUrl = `https://blog.her-healing-initiative.org/${user?.avatar}`;
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
                <NavLink  eventKey="1" as={Link} to="/listblogs">Blogs</NavLink>
                <NavDropdown title="About" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/team">Meet our Team!</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/faqs">FAQ</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/contact">Contact</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/login">Sign in</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/logout">Sign Out</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>               
        <div id="wrapper">
            <div id="right">
                <Tooltip target=".registered-user" />
                {/* This code block will only render if the token is not null */}
                {token && (
                <div className="flex align-items-center">
                    <Avatar 
                        className="registered-user mr-2" 
                        image={avatarUrl} // Use a default image if avatar is not available
                        size="large" 
                        shape="circle" 
                        data-pr-tooltip={user?.name} 
                        data-pr-position="left"
                    />
                </div>
                )}
            </div>
        </div>  
    </Navbar>
    );
}
 
export default Navigationbar;