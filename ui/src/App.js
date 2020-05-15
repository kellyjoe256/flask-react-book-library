// @ts-nocheck
import React from 'react';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import Routes from './router';
import { authenticate, selectUser } from './store/modules/auth';
import MainNavbar from './components/MainNavbar';

function App() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    if (!user) {
        dispatch(authenticate());
    }

    return (
        <>
            <ToastContainer position="top-center" autoClose={5000} />
            <MainNavbar user={user} />
            <Container id="wrapper">
                <Routes user={user} />
            </Container>
        </>
    );
}

export default App;
