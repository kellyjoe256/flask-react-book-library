import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import _ from 'lodash';
import { logout } from '../store/modules/auth';

const MainNavbar = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { user } = props;

    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Link className="navbar-brand" to={user ? '/admin' : '/'}>
                    {user ? 'Dashboard' : 'Book Library'}
                </Link>
                <Nav className="ml-auto">
                    {user && (
                        <>
                            <NavDropdown
                                title={_.startCase(user.username)}
                                id="nav-dropdown"
                            >
                                <NavDropdown.Item
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();

                                        dispatch(logout());

                                        history.push('/login');
                                    }}
                                >
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </>
                    )}
                    {!user && (
                        <NavLink className="nav-link" to="/login" exact>
                            Login
                        </NavLink>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

MainNavbar.propTypes = {
    user: PropTypes.object,
};

export default MainNavbar;
