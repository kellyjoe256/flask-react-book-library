// @ts-nocheck
import React from 'react';
import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './router';
import MainNavbar from './components/MainNavbar';

function App() {
    return (
        <>
            <Provider store={store}>
                <MainNavbar />
                <Container>
                    <Routes />
                </Container>
            </Provider>
        </>
    );
}

export default App;
