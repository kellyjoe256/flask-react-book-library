import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';

const MainNavbar = () => {
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Link className="navbar-brand" to="/">
                    Book Library
                </Link>
                <Nav className="ml-auto">
                    <NavLink className="nav-link" to="/login" exact>
                        Login
                    </NavLink>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default MainNavbar;
